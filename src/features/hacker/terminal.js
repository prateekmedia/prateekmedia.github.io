const TOKEN_KIND = {
  punctuation: "punctuation",
  key: "key",
  string: "string",
  link: "link",
}

const token = (kind, value, href) => ({ kind, value, href })
const punctuation = (value) => token(TOKEN_KIND.punctuation, value)
const key = (value) => token(TOKEN_KIND.key, value)
const string = (value) => token(TOKEN_KIND.string, value)
const link = (value, href) => token(TOKEN_KIND.link, value, href)

export const HTTP_HEADERS = [
  ["server", "nginx"],
  ["content-type", "application/json; charset=utf-8"],
  ["x-powered-by", "coffee"],
  ["x-hacker-mode", "enabled"],
]

export const TERMINAL_TIMING = {
  typeInterval: 16,
  responsePause: 100,
  headerStart: 150,
  headerStep: 40,
  asciiColumns: 56,
  asciiStep: 4,
  asciiGap: 80,
  bodyStep: 16,
}

export function createProfileResponse(profile) {
  const lines = []
  const addLine = (...tokens) => lines.push(tokens)

  addLine(punctuation("{"))
  addLine(punctuation("  "), key('"name"'), punctuation(": "), string(`"${profile.name}"`), punctuation(","))
  addLine(punctuation("  "), key('"role"'), punctuation(": "), string(`"${profile.role}"`), punctuation(","))
  addLine(punctuation("  "), key('"bio"'), punctuation(": "), string(`"${profile.bio}"`), punctuation(","))
  addLine(punctuation("  "), key('"location"'), punctuation(": "), string(`"${profile.location}"`), punctuation(","))
  addLine(punctuation("  "), key('"avatar"'), punctuation(": "), link(profile.avatar, profile.avatar), punctuation(","))
  addLine(punctuation("  "), key('"links"'), punctuation(" {"))

  profile.links.forEach((item, index) => {
    const comma = index < profile.links.length - 1 ? "," : ""
    addLine(
      punctuation("    "),
      key(`"${item.key}"`),
      punctuation(": "),
      link(item.value, item.url),
      punctuation(comma),
    )
  })

  addLine(punctuation("  }"), punctuation(","))
  addLine(punctuation("  "), key('"blogs"'), punctuation(" {"))

  profile.blogs.forEach((blog, index) => {
    const comma = index < profile.blogs.length - 1 ? "," : ""
    addLine(
      punctuation("    "),
      key(`"${blog.key}"`),
      punctuation(": "),
      link(blog.title, blog.url),
      punctuation(comma),
    )
  })

  addLine(punctuation("  }"))
  addLine(punctuation("}"))

  return lines
}

export { TOKEN_KIND }
