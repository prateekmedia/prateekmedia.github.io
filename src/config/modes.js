import { lazy } from "react"
import HackerView from "../features/hacker/HackerView"

const loadEditorialView = () => import("../features/editorial/EditorialView")
const loadResumeView = () => import("../features/resume/ResumeView")

const EditorialView = lazy(loadEditorialView)
const ResumeView = lazy(loadResumeView)

export const MODE_OPTIONS = [
  { id: "hacker", label: "hacker", View: HackerView },
  { id: "normie", label: "normie", View: EditorialView, preload: loadEditorialView },
  { id: "resume", label: "resume", View: ResumeView, preload: loadResumeView },
]

export const DEFAULT_MODE = MODE_OPTIONS[0]

export function findMode(modeId) {
  return MODE_OPTIONS.find(({ id }) => id === modeId) ?? DEFAULT_MODE
}
