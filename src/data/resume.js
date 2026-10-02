const link = (label, href) => ({ label, href })

export const experience = [
  {
    company: "Bruno",
    companyUrl: "https://www.usebruno.com",
    repoUrl: "https://github.com/usebruno/bruno",
    stars: "46.5k",
    date: "Apr 2026 – Present",
    role: "SDE2",
    achievements: [
      "Working on and shaping Bruno's core features: sandbox runtime, authentication modes, migration from other clients, and more",
      "Made Git-backed collections trustworthy, rewriting the watcher so the UI stops serving stale state",
      "Took License Manager from untestable to verifiable, building the local tooling and staging the team needs to exercise the flows before customers do",
      "Smoothed the path in from Insomnia and OpenAPI, rebuilding the import flow and fixing the spec edge cases that were silently breaking migrations",
      "Carried users through a breaking v4 release, warning them in-app before it landed and giving them a CLI path across",
      "Rebuilt the in-app notification surface that every product announcement ships through",
    ],
  },
  {
    company: "Ente",
    companyUrl: "https://ente.com/?utm_source=prateek",
    repoUrl: "https://github.com/ente-io/ente",
    stars: "28.5k",
    date: "Jan 2024 – Mar 2026",
    role: "Software Engineer",
    achievements: [
      [
        "Implemented end-to-end encrypted video streaming solution (",
        link(
          "IndiaFOSS talk",
          "https://www.youtube.com/live/0_TExIe4rNw?si=aAcNagtpbEI3yvqt&t=2278",
        ),
        ")",
      ],
      "Faster and reliable uploads with background processing and multipart uploads",
      "Built a plugin for native video editor, 7 times faster than existing plugin",
      "Native widgets to surface on-device machine learning powered memories",
      "Smart albums support for automatically adding photos of selected person in an album",
      [
        "Created ",
        link("Ensu", "https://ente.com/blog/ensu/?utm_source=prateek"),
        ", a local LLM app, maintaining it across all platforms (",
        link("#1 on HackerNews", "https://news.ycombinator.com/item?id=47516650"),
        ")",
      ],
      [
        "Engineered a desktop version of the 2FA app, ",
        link("Ente Auth", "https://ente.com/auth/?utm_source=prateek"),
        ", used by 300k users",
      ],
    ],
  },
  {
    company: "Google Summer of Code",
    companyUrl: "https://ccextractor.org",
    repoUrl: "https://github.com/CCExtractor/ccextractor",
    stars: "899",
    date: "2023 – 2025",
    achievements: [
      [
        "Participated in GSoC in ",
        link("2023", "https://summerofcode.withgoogle.com/archive/2023/projects/ok8JVTpq"),
        " and ",
        link("2024", "https://summerofcode.withgoogle.com/archive/2024/projects/xln2Bm9m"),
        " as a Mentee, ",
        link("2025", "https://summerofcode.withgoogle.com/archive/2025/projects/t4gOHYbv"),
        " as a Mentor",
      ],
      [
        "Mentored two engineers through their projects (",
        link(
          "CCExtractor v1.00 Release",
          "https://summerofcode.withgoogle.com/archive/2025/projects/t4gOHYbv",
        ),
        ", ",
        link(
          "Rewriting lib_ccx",
          "https://summerofcode.withgoogle.com/archive/2025/projects/aFiTJC0l",
        ),
        ")",
      ],
      "Migrated core C modules to Rust, improving reliability and memory safety",
      "Fixed flaky builds that kept breaking on different operating systems",
      "Restored the test suite, unblocking releases that had been stalled",
      "Shipped a major CCExtractor release and helped grow the community",
    ],
  },
]

export const projects = [
  {
    name: "AppImage Pool",
    url: "https://github.com/prateekmedia/appimagepool",
    metric: "★ 721",
    description: "A clean, easy way to discover and install 500+ Linux apps",
  },
  {
    name: "PsTube",
    url: "https://github.com/prateekmedia/pstube",
    metric: "★ 545",
    description: "Watch and download YouTube videos without ads, on any platform",
  },
  {
    name: "Flutter Speed Dial",
    url: "https://pub.dev/packages/flutter_speed_dial",
    metric: "♥ 1.3k",
    description: "A popular Flutter package for animated, expandable floating action buttons",
  },
  {
    name: "Libadwaita",
    url: "https://github.com/gtk-flutter/libadwaita",
    metric: "★ 270",
    description: "Brought GNOME's beautiful design language to Flutter apps everywhere",
  },
  {
    name: "Net Speed Simplified",
    url: "https://github.com/prateekmedia/netspeedsimplified",
    metric: "★ 130",
    description: "See your internet speed at a glance, right in your GNOME desktop panel",
  },
]

export const talks = [
  {
    image: "/talks/indiafoss-2025.jpg",
    title: "E2EE Video Streaming at Ente",
    event: "IndiaFOSS 2025",
    url: "https://www.linkedin.com/posts/prateek-sunal_a-quick-look-at-my-talk-on-entes-approach-activity-7375950836784492544-NIAK",
  },
  {
    image: "/talks/gehu-2025.jpg",
    title: "Open Source Software and Technologies",
    event: "Graphic Era Hill University",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7384140059542925313/",
  },
  {
    image: "/talks/namma-flutter-2025.jpg",
    title: "Ente Auth's Approach Towards Flutter Desktop",
    event: "Namma Flutter DevCON 2025",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7405541338479460353/",
  },
]

export const highlights = [
  {
    label: "GitHub Stars",
    emphasis: "1600+",
    url: "https://github.com/prateekmedia?tab=repositories&sort=stargazers",
  },
  { label: "Flutter Apps", emphasis: "20+" },
  {
    label: "Flutter Framework Contributor",
    url: "https://github.com/flutter/flutter/pull/91982",
  },
]
