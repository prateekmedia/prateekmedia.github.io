import ExternalLink from "../../components/shared/ExternalLink"
import { profile } from "../../data/profile"
import AsciiAvatar from "./AsciiAvatar"
import { createProfileResponse, HTTP_HEADERS, TERMINAL_TIMING, TOKEN_KIND } from "./terminal"
import { useTerminalIntro } from "./useTerminalIntro"
import "./hacker.css"

const COMMAND = `curl https://${profile.domain} -i`
const RESPONSE_LINES = createProfileResponse(profile)

const asciiStart = (
  TERMINAL_TIMING.headerStart
  + HTTP_HEADERS.length * TERMINAL_TIMING.headerStep
  + TERMINAL_TIMING.asciiGap
)
const bodyStart = (
  asciiStart
  + TERMINAL_TIMING.asciiColumns * TERMINAL_TIMING.asciiStep
  + 120
)
const promptStart = bodyStart + RESPONSE_LINES.length * TERMINAL_TIMING.bodyStep + 100

function TerminalToken({ token }) {
  if (token.kind === TOKEN_KIND.key) {
    return <span className="font-semibold text-emerald-300">{token.value}</span>
  }

  if (token.kind === TOKEN_KIND.string) {
    return <span className="text-emerald-100/80">{token.value}</span>
  }

  if (token.kind === TOKEN_KIND.link) {
    return (
      <ExternalLink
        href={token.href}
        className="underline decoration-emerald-600 underline-offset-4 transition-colors hover:text-white"
        onClick={(event) => event.stopPropagation()}
      >
        &quot;{token.value}&quot;
      </ExternalLink>
    )
  }

  return <span className="text-emerald-600">{token.value}</span>
}

function AnimatedLine({ delay, children, className = "" }) {
  return (
    <div
      className={`line-in whitespace-pre-wrap break-all ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function TerminalCursor() {
  return <span className="terminal-cursor caret-blink text-emerald-400" aria-hidden="true" />
}

export default function HackerView() {
  const { typedLength, hasResponse, revealResponse } = useTerminalIntro(COMMAND, TERMINAL_TIMING)

  return (
    <main
      className="crt-screen relative min-h-dvh overflow-hidden bg-[#040705] font-mono text-sm sm:text-base"
      onClick={revealResponse}
    >
      <div className="mx-auto min-h-dvh w-full max-w-5xl px-5 py-10 sm:px-8">
        <div aria-live="polite" className="leading-relaxed">
          <div className="crt-glow whitespace-pre-wrap break-all">
            <span className="text-emerald-600">$ </span>
            <span className="text-zinc-100">{COMMAND.slice(0, typedLength)}</span>
            {!hasResponse && <TerminalCursor />}
          </div>

          {hasResponse && (
            <div>
              <AnimatedLine delay={TERMINAL_TIMING.headerStart - 100} className="crt-glow mt-6">
                <span className="text-zinc-600">HTTP/2</span>{" "}
                <span className="font-bold text-emerald-300">200 OK</span>
              </AnimatedLine>

              {HTTP_HEADERS.map(([name, value], index) => (
                <AnimatedLine
                  key={name}
                  delay={TERMINAL_TIMING.headerStart + index * TERMINAL_TIMING.headerStep}
                >
                  <span className="text-zinc-600">{name}</span>
                  <span className="text-zinc-700">: </span>
                  <span className="text-zinc-400">{value}</span>
                </AnimatedLine>
              ))}

              <AsciiAvatar
                source={profile.avatar}
                columns={TERMINAL_TIMING.asciiColumns}
                startDelay={asciiStart}
                lineDelay={TERMINAL_TIMING.asciiStep}
              />

              {RESPONSE_LINES.map((tokens, lineIndex) => (
                <AnimatedLine
                  key={lineIndex}
                  delay={bodyStart + lineIndex * TERMINAL_TIMING.bodyStep}
                >
                  {tokens.map((item, tokenIndex) => (
                    <TerminalToken key={`${item.kind}-${tokenIndex}`} token={item} />
                  ))}
                </AnimatedLine>
              ))}

              <AnimatedLine delay={promptStart} className="crt-glow mt-8">
                <span className="text-emerald-600">$ </span>
                <TerminalCursor />
              </AnimatedLine>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
