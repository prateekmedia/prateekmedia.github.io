import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import { profile } from "../src/data/profile.js"
import { asciiRows, pixelsToAscii, TERMINAL_CELL_ASPECT } from "../src/features/hacker/ascii.js"
import { TERMINAL_TIMING } from "../src/features/hacker/terminal.js"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const PUBLIC_DIR = join(ROOT, "public")
const BLOG_DIR = join(PUBLIC_DIR, "blog")
const POST_SLOT = /<article class="blog-post" id="blog-content">[\s\S]*?<\/article>/

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${href}">${stripTracking(label)}</a>`)
}

function stripTracking(text) {
  return text
    .replace(/([?&]|&amp;)utm_[^&\s]*/g, "$1")
    .replace(/(\?|&amp;|&)(?:&amp;|&)+/g, "$1")
    .replace(/(\?|&amp;|&)(?=\s|$)/g, "")
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, "")
}

export function parseFrontmatter(src) {
  const meta = {}
  if (!src.startsWith("---\n")) return { meta, body: src }

  const end = src.indexOf("\n---", 4)
  if (end === -1) return { meta, body: src }

  for (const line of src.substring(4, end).split("\n")) {
    const idx = line.indexOf(":")
    if (idx !== -1) meta[line.substring(0, idx).trim()] = line.substring(idx + 1).trim()
  }
  return { meta, body: src.substring(end + 4).replace(/^\n+/, "") }
}

function buildToc(headings) {
  if (headings.length < 2) return ""

  const hasSubHeadings = headings.some(({ level }) => level === 1)
  const links = headings.map(({ id, text, level }) => {
    const className = level === 2 && hasSubHeadings ? ' class="toc-sub"' : ""
    return `<a href="#${id}"${className}>${text}</a>`
  })
  return `<nav class="blog-toc" aria-label="Table of contents">${links.join("")}</nav>`
}

export function renderMarkdown(src) {
  const { meta, body } = parseFrontmatter(src)
  const headings = []
  let html = ""
  let inList = false
  let inQuote = false
  let quoteBlock = ""
  let inCode = false
  let codeBlock = ""

  const closeList = () => {
    if (inList) html += "</ul>"
    inList = false
  }
  const closeQuote = () => {
    if (inQuote) html += `${quoteBlock}</p></blockquote>`
    inQuote = false
    quoteBlock = ""
  }
  const heading = (level, text) => {
    const id = slugify(text)
    const content = inline(text)
    if (level <= 2) headings.push({ id, text: stripTags(content), level })
    html += `<h${level} id="${id}">${content}</h${level}>`
  }

  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(codeBlock)}</code></pre>`
        codeBlock = ""
        inCode = false
      } else {
        closeList()
        closeQuote()
        inCode = true
      }
      continue
    }

    if (inCode) {
      codeBlock += (codeBlock ? "\n" : "") + line
      continue
    }

    if (inList && !/^- /.test(line)) closeList()
    if (inQuote && !/^> ?/.test(line)) closeQuote()

    if (/^-{3,}$/.test(line)) {
      html += "<hr>"
    } else if (/^# /.test(line)) {
      const text = line.slice(2)
      if (!(meta.title && slugify(text) === slugify(meta.title))) heading(1, text)
    } else if (/^## /.test(line)) {
      heading(2, line.slice(3))
    } else if (/^### /.test(line)) {
      heading(3, line.slice(4))
    } else if (/^> ?/.test(line)) {
      const text = line.replace(/^> ?/, "")
      if (!inQuote) {
        inQuote = true
        quoteBlock = `<blockquote><p>${inline(text)}`
      } else {
        quoteBlock += text === "" ? "</p><p>" : `<br>${inline(text)}`
      }
    } else if (/^- /.test(line)) {
      if (!inList) html += "<ul>"
      inList = true
      html += `<li>${inline(line.slice(2))}</li>`
    } else if (line.trim() !== "") {
      html += `<p>${inline(line)}</p>`
    }
  }

  closeList()
  closeQuote()
  if (inCode) html += `<pre><code>${escapeHtml(codeBlock)}</code></pre>`

  let header = meta.title ? `<h1>${escapeHtml(meta.title)}</h1>` : ""
  if (meta.date) header += `<p class="blog-meta">${escapeHtml(meta.date)}</p>`

  return { meta, html: header + buildToc(headings) + html }
}

function readMetaTag(html, property) {
  const match = html.match(new RegExp(`<meta (?:property|name)="${property}" content="([^"]*)"`))
  return match ? match[1] : ""
}

export function listPosts() {
  return readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(BLOG_DIR, entry.name, `${entry.name}.md`)))
    .map(({ name: slug }) => {
      const template = readFileSync(join(BLOG_DIR, slug, "index.html"), "utf8")
      const { meta, html } = renderMarkdown(readFileSync(join(BLOG_DIR, slug, `${slug}.md`), "utf8"))
      return {
        slug,
        url: `${profile.url}/blog/${slug}/`,
        title: meta.title ?? slug,
        date: new Date(`${meta.date} UTC`),
        summary: meta.summary ?? "",
        description: readMetaTag(template, "og:description"),
        page: template.replace(POST_SLOT, `<article class="blog-post" id="blog-content">${html}</article>`),
      }
    })
    .sort((a, b) => b.date - a.date)
}

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" })

export function renderBlogIndex(posts) {
  const items = posts
    .map((post) => `    <li><a href="/blog/${post.slug}/">${escapeHtml(post.title)}</a> <time class="date" datetime="${post.date.toISOString().slice(0, 10)}">${dateFormat.format(post.date)}</time></li>`)
    .join("\n")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#fafafa">
  <title>Blog - ${profile.name}</title>
  <meta name="description" content="Writing by ${profile.name}.">
  <link rel="alternate" type="application/rss+xml" title="${profile.name}" href="/feed.xml">
  <link rel="stylesheet" href="/style.css">
  <link rel="icon" type="image/png" href="/favicon.png">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<main id="main">
  <article class="blog-post">
    <h1>Blog</h1>
    <ul class="blog-index">
${items}
    </ul>
  </article>
</main>
<footer>
  <p><a href="/">${profile.name}</a> &middot; <a href="/feed.xml">RSS</a></p>
</footer>
</body>
</html>
`
}

export function renderFeed(posts) {
  const items = posts
    .map((post) => `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${escapeHtml(post.description)}</description>
    </item>`)
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${profile.name}</title>
    <link>${profile.url}/blog/</link>
    <atom:link href="${profile.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Writing by ${profile.name}.</description>
${items}
  </channel>
</rss>
`
}

export function renderSitemap(posts) {
  const urls = [`${profile.url}/`, `${profile.url}/blog/`, ...posts.map((post) => post.url)]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`
}

export function renderLlmsTxt(posts) {
  const social = profile.links.filter(({ key }) => key !== "email")
  const email = profile.links.find(({ key }) => key === "email")
  const external = profile.externalBlogs

  return `# ${profile.name}

> ${profile.name} is a ${profile.role.toLowerCase()} in ${profile.location}. Portfolio at ${profile.domain} with hacker, editorial, and résumé views. Contact: ${email.value}.

Blog posts are static pages; each post’s markdown lives alongside its HTML under \`/blog/<slug>/\`.

## Site

- [Home](${profile.url}/): Portfolio (terminal, editorial profile, résumé)
${social.map(({ label, url, summary }) => `- [${label}](${url})${summary ? `: ${summary}` : ""}`).join("\n")}

## Blog

${posts.map((post) => `- [${post.title}](${profile.url}/blog/${post.slug}/${post.slug}.md)${post.summary ? `: ${post.summary}` : ""}`).join("\n")}
${external.length ? `\n## Optional\n\n${external.map(({ title, url, summary }) => `- [${title}](${url})${summary ? `: ${summary}` : ""}`).join("\n")}\n` : ""}`
}

function withoutTracking(url) {
  const parsed = new URL(url)
  for (const param of [...parsed.searchParams.keys()]) {
    if (param.startsWith("utm_")) parsed.searchParams.delete(param)
  }
  return parsed.toString()
}

export function renderProfileJson() {
  const toEntries = (items, pick) => Object.fromEntries(items.map((item) => [item.key, pick(item)]))

  return `${JSON.stringify({
    name: profile.name,
    role: profile.role,
    bio: profile.bio,
    location: profile.location,
    avatar: profile.avatar,
    links: toEntries(profile.links, ({ value }) => value),
    blogs: toEntries(profile.blogs, ({ url }) => withoutTracking(url)),
    "external-blogs": toEntries(profile.externalBlogs, ({ url }) => withoutTracking(url)),
  }, null, 2)}\n`
}

let asciiAvatar

export function renderAsciiAvatar() {
  asciiAvatar ??= (async () => {
    const response = await fetch(profile.avatar)
    if (!response.ok) throw new Error(`avatar fetch failed: ${response.status}`)

    const image = sharp(Buffer.from(await response.arrayBuffer()))
    const { width, height } = await image.metadata()
    const columns = TERMINAL_TIMING.asciiColumns
    const rows = asciiRows(width, height, columns, TERMINAL_CELL_ASPECT)
    const data = await image.resize(columns, rows, { fit: "fill" }).ensureAlpha().raw().toBuffer()

    return pixelsToAscii(data, columns, rows).join("\n")
  })().catch((error) => {
    console.warn(`blog: skipping ASCII avatar (${error.message})`)
    asciiAvatar = undefined
    return ""
  })
  return asciiAvatar
}

export async function renderCurlResponse() {
  const art = await renderAsciiAvatar()
  return art ? `${art}\n\n${renderProfileJson()}` : renderProfileJson()
}

export async function buildBlog(outDir) {
  const posts = listPosts()

  for (const post of posts) {
    mkdirSync(join(outDir, "blog", post.slug), { recursive: true })
    writeFileSync(join(outDir, "blog", post.slug, "index.html"), post.page)
  }
  writeFileSync(join(outDir, "blog", "index.html"), renderBlogIndex(posts))
  writeFileSync(join(outDir, "feed.xml"), renderFeed(posts))
  writeFileSync(join(outDir, "sitemap.xml"), renderSitemap(posts))
  writeFileSync(join(outDir, "llms.txt"), renderLlmsTxt(posts))
  writeFileSync(join(outDir, "api"), await renderCurlResponse())
  writeFileSync(join(outDir, "api.json"), renderProfileJson())

  return posts
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const posts = await buildBlog(join(ROOT, "dist"))
  console.log(`blog: rendered ${posts.length} posts, index, feed.xml, sitemap.xml, llms.txt, api`)
}
