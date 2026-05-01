# SUMMIFY

**An AI-powered document summarization Progressive Web App** built for students, educators, and professionals who need to extract meaning from large documents — fast.

---

## Overview

SUMMIFY lets you upload a document (PDF, DOCX, or TXT), paste raw text, or type directly — and receive a concise AI-generated summary with key term visualization. It runs entirely in the browser, installs as a native-like PWA, and works offline.

Built as a final project for *Application Development and Emerging Technologies* — BSCS 2A, 2nd Semester AY 2025–2026.

---

## Features

- **Multi-format document parsing** — PDF, DOCX, and TXT processed fully in-browser via `pdf.js` and `mammoth.js`
- **Paste or type** — supports clipboard paste or direct text input, no file required
- **Summary modes** — toggle between Bullet Point and Paragraph output
- **Dark mode** — full dark/light theme with smooth transitions
- **Dyslexic font mode** — switches to OpenDyslexic for improved readability
- **PWA support** — installable on desktop and mobile, with offline caching via Vite PWA
- **Responsive, mobile-first UI** — designed for a 412px viewport

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | JavaScript (ES Modules) |
| Styling | Tailwind CSS + CSS custom properties |
| Routing | React Router v6 |
| State | Context API |
| Document parsing | `pdf.js` (PDF), `mammoth.js` (DOCX) |
| PWA | Vite PWA Plugin |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── App.jsx                      # Router root
├── main.jsx
├── styles/index.css             # Design tokens, dark/dyslexic mode, animations
├── context/
│   ├── DocumentContext.jsx      # Global document + UI state
│   └── ThemeContext.jsx         # Dark mode + dyslexic font persistence
├── hooks/
│   ├── useAuth.js               # Sign-in / sign-up form logic & validation
│   └── useFileParser.js         # PDF / DOCX / TXT → plain text
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx        # Page shell
│   │   ├── Navbar.jsx           # Top bar
│   │   └── TabBar.jsx           # Tab navigation
│   └── ui/
│       ├── InputField.jsx       # Reusable input with icon + password toggle
│       ├── ModeToggle.jsx       # Bullet / Paragraph mode pill
│       ├── SummaryContent.jsx   # Renders summary in chosen mode
│       ├── ToggleSwitch.jsx     # Accessible toggle button
│       ├── PasteTextModal.jsx   # Bottom-sheet paste modal
│       └── GoogleLogo.jsx       # Inline SVG Google G
└── pages/
    ├── SignIn.jsx
    ├── SignUp.jsx
    └── OriginalPage.jsx         # Upload / paste / type interface
```

---

## Getting Started

## SDG Alignment

| SDG | How SUMMIFY Contributes |
|---|---|
| **SDG 4 — Quality Education** | Supports faster comprehension of academic materials for students and educators |
| **SDG 8 — Decent Work & Economic Growth** | Reduces time spent on manual document review for professionals |

---

## Target Users

- **Students** — quickly understand research papers and academic materials
- **Educators** — review learning resources and reference documents efficiently
- **Professionals** — process reports and articles without reading every word

---

## Roadmap

- [ ] Real authentication (Firebase / Supabase)
- [ ] AI summarization integration (OpenRouter)
- [ ] Key-term graph visualization (React Flow)
- [ ] Account management page
- [ ] Color blind mode
- [ ] Summary export

---

## Author

**Bayog, Frietz Ranz R.**  
BSCS – 2A | Application Development and Emerging Technologies  
AY 2025–2026, 2nd Semester
