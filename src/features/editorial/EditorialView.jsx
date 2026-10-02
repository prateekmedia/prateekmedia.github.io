import ExternalLink from "../../components/shared/ExternalLink"
import { profile } from "../../data/profile"
import { socialIcons } from "./socialIcons"

function getHostname(url) {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

export default function EditorialView() {
  return (
    <main className="min-h-dvh bg-[#faf9f7] px-6 py-16 font-serif text-zinc-900 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="border-b border-zinc-300 pb-4 font-sans text-[11px] uppercase tracking-[0.25em] text-zinc-500">
          {profile.location}
        </p>

        <header className="mt-12 flex items-end justify-between gap-8">
          <h1 className="text-6xl leading-[0.95] tracking-tight sm:text-7xl">
            {profile.firstName}
            <br />
            <em className="font-light">{profile.lastName}</em>
          </h1>
          <img
            src={profile.avatar}
            alt={profile.name}
            decoding="async"
            className="h-20 w-20 shrink-0 rounded-full object-cover grayscale sm:h-24 sm:w-24"
          />
        </header>

        <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-zinc-400">
          {profile.role}
        </p>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-600">{profile.bio}</p>

        <nav
          className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 font-sans text-sm font-medium"
          aria-label="Social links"
        >
          {profile.links.map((link) => (
            <ExternalLink
              key={link.key}
              href={link.url}
              className="group inline-flex items-center gap-1.5 text-zinc-800"
            >
              {socialIcons[link.key]}
              <span className="underline decoration-zinc-300 underline-offset-4 transition-colors group-hover:decoration-zinc-900">
                {link.label}
              </span>
            </ExternalLink>
          ))}
        </nav>

        <section className="mt-20">
          <h2 className="border-b border-zinc-300 pb-3 font-sans text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            Writing
          </h2>
          <ul>
            {profile.blogs.map((blog) => (
              <li key={blog.key} className="border-b border-zinc-200">
                <ExternalLink
                  href={blog.url}
                  className="group flex items-baseline justify-between gap-6 py-5"
                >
                  <span className="text-xl transition-colors group-hover:text-zinc-500">
                    {blog.title}
                  </span>
                  <span className="shrink-0 font-sans text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                    {getHostname(blog.url)} ↗
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-20 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.25em] text-zinc-400">
          <span>© {new Date().getFullYear()}</span>
          <a href={profile.url} className="hover:text-zinc-700">
            {profile.domain}
          </a>
        </footer>
      </div>
    </main>
  )
}
