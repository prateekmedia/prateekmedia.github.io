export default function ExternalLink({ children, ...props }) {
  return (
    <a {...props} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}
