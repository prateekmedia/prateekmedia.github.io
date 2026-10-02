import { lazy } from "react"
import HackerView from "../features/hacker/HackerView"

const loadEditorialView = () => import("../features/editorial/EditorialView")
const loadResumeView = () => import("../features/resume/ResumeView")

const EditorialView = lazy(loadEditorialView)
const ResumeView = lazy(loadResumeView)

export const MODE_OPTIONS = [
  { id: "hacker", label: "hacker", title: "Prateek Sunal", themeColor: "#040705", View: HackerView },
  { id: "normie", label: "normie", title: "Prateek Sunal — Profile", themeColor: "#faf9f7", View: EditorialView, preload: loadEditorialView },
  { id: "resume", label: "resume", title: "Prateek Sunal — Résumé", themeColor: "#fafafa", View: ResumeView, preload: loadResumeView },
]

export function isModeId(modeId) {
  return MODE_OPTIONS.some(({ id }) => id === modeId)
}

export const DEFAULT_MODE = MODE_OPTIONS[0]

export function findMode(modeId) {
  return MODE_OPTIONS.find(({ id }) => id === modeId) ?? DEFAULT_MODE
}
