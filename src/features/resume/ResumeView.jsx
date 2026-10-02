import ExternalLink from "../../components/shared/ExternalLink"
import { profile } from "../../data/profile"
import { experience, highlights, projects, talks } from "../../data/resume"
import "./resume.css"

function ResumeSection({ title, children }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function RichText({ content }) {
  const segments = Array.isArray(content) ? content : [content]

  return segments.map((segment, index) => {
    if (typeof segment === "string") return segment

    return (
      <ExternalLink key={`${segment.href}-${index}`} href={segment.href} className="resume-inline-link">
        {segment.label}
      </ExternalLink>
    )
  })
}

function ExperienceList() {
  return (
    <dl className="resume-list">
      {experience.map((job) => (
        <div key={job.company}>
          <dt>
            <span>
              <ExternalLink href={job.companyUrl}>{job.company}</ExternalLink>{" "}
              <ExternalLink
                href={job.repoUrl}
                className="resume-badge"
                aria-label={`${job.company} on GitHub, ${job.stars} stars`}
              >
                ★ {job.stars}
              </ExternalLink>
            </span>
            <span className="resume-date">{job.date}</span>
          </dt>
          {job.role && <dd className="resume-sub">{job.role}</dd>}
          {job.achievements.map((achievement, index) => (
            <dd className="resume-bullet" key={index}>
              <RichText content={achievement} />
            </dd>
          ))}
        </div>
      ))}
    </dl>
  )
}

function ProjectList() {
  return (
    <dl className="resume-list">
      {projects.map((project) => (
        <div key={project.name}>
          <dt>
            <ExternalLink href={project.url}>{project.name}</ExternalLink>
            <ExternalLink href={project.url} className="resume-stars">
              {project.metric}
            </ExternalLink>
          </dt>
          <dd>{project.description}</dd>
        </div>
      ))}
    </dl>
  )
}

function TalksList() {
  return (
    <div className="resume-talks">
      {talks.map((talk) => (
        <ExternalLink href={talk.url} className="resume-talk" key={talk.title}>
          <img src={talk.image} alt={talk.event} loading="lazy" decoding="async" />
          <div>
            <strong>{talk.title}</strong>
            <span className="resume-date">{talk.event}</span>
          </div>
        </ExternalLink>
      ))}
    </div>
  )
}

function HighlightsList() {
  return (
    <div className="resume-highlights">
      {highlights.map((highlight) => {
        const content = (
          <>
            {highlight.emphasis && <strong>{highlight.emphasis}</strong>}{" "}
            {highlight.label}
          </>
        )

        return highlight.url ? (
          <ExternalLink href={highlight.url} className="resume-chip" key={highlight.label}>
            {content}
          </ExternalLink>
        ) : (
          <span className="resume-chip" key={highlight.label}>{content}</span>
        )
      })}
    </div>
  )
}

export default function ResumeView() {
  const socialLinks = profile.links.filter((link) => link.key !== "email")
  const emailLink = profile.links.find((link) => link.key === "email")

  return (
    <div className="resume-page">
      <div className="resume-shell">
        <header className="resume-header">
          <div>
            <h1>{profile.name}</h1>
            <p className="resume-meta">{profile.location}</p>
          </div>
          <nav className="resume-nav" aria-label="Social links">
            {socialLinks.map((socialLink) => (
              <ExternalLink href={socialLink.url} key={socialLink.key}>
                {socialLink.label}
              </ExternalLink>
            ))}
          </nav>
        </header>

        <main>
          <ResumeSection title="Experience"><ExperienceList /></ResumeSection>
          <ResumeSection title="Side Projects"><ProjectList /></ResumeSection>
          <ResumeSection title="Talks"><TalksList /></ResumeSection>
          <ResumeSection title="Blogs">
            <ul className="resume-link-list">
              {profile.blogs.map((blog) => (
                <li key={blog.key}>
                  <ExternalLink href={blog.url}>{blog.title}</ExternalLink>
                </li>
              ))}
            </ul>
          </ResumeSection>
          <ResumeSection title="Highlights"><HighlightsList /></ResumeSection>
        </main>

        <footer className="resume-footer">
          <p>
            {profile.name}
            {emailLink && <> · <a href={emailLink.url}>{emailLink.value}</a></>}
          </p>
        </footer>
      </div>
    </div>
  )
}
