<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/GPT--4o-Powered-412991?logo=openai" alt="GPT-4o" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

<h1 align="center">ClaudeMD Generator</h1>

<p align="center">
  <strong>Generate high-quality <code>CLAUDE.md</code> files from a guided questionnaire.</strong><br/>
  Turn your project context into structured, actionable instructions for AI coding agents.
</p>

<p align="center">
  <a href="https://gen-md-claude-code.vercel.app">Live Demo</a>
</p>

---

## The Problem

AI coding agents (Claude, Cursor, Copilot...) are powerful but **they know nothing about your project**. Without context, they guess your stack, invent conventions, and produce inconsistent code.

## The Solution

A `CLAUDE.md` file at the root of your project acts as a **briefing document** the agent reads before working. It contains your stack, rules, commands, architecture decisions, and boundaries.

**ClaudeMD Generator** produces this file automatically through a **27-section guided questionnaire** covering everything from business context to deployment strategy -- with optional GPT-4o enhancement.

---

## Features

- **Guided Questionnaire** -- 27 structured sections covering identity, stack, commands, security, testing, CI/CD, and more
- **Smart Defaults** -- contextual options adapt based on your project type (SaaS, API, mobile, etc.)
- **"Let Claude Decide"** -- novice-friendly button that lets the AI agent figure out your stack
- **GPT-4o Enhancement** -- optional AI pass to polish and enrich the generated output
- **Quality Report** -- automated scoring with coverage, verbosity, and rule checks
- **Live Editor** -- edit the generated markdown before exporting
- **Multi-export** -- download as `.md`, copy to clipboard, or export as ZIP with `agent_docs/`
- **i18n** -- full English and French support
- **MCP Integrations** -- enable MCP tool blocks (Gemini Design, etc.) directly in your output
- **100% Client-Side** -- all data stays in your browser (localStorage), no database, no accounts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 |
| State | Zustand (persisted localStorage) |
| Forms | React Hook Form + Zod |
| AI | OpenAI GPT-4o (optional) |
| Icons | Lucide React |
| Animation | Framer Motion |
| Analytics | Vercel Analytics |
| Testing | Vitest + React Testing Library |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
git clone https://github.com/your-username/claudemd-generator.git
cd claudemd-generator
pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
OPENAI_API_KEY=sk-...       # Required only for AI enhancement
OPENAI_MODEL=gpt-4o         # Optional, defaults to gpt-4o
```

> **Note:** The app works fully without an API key. AI enhancement is opt-in.

### Development

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm typecheck    # Type checking
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Run tests
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── generate/route.ts     # CLAUDE.md generation endpoint
│   │   └── quality/route.ts      # Quality check endpoint
│   ├── page.tsx                  # Landing page
│   ├── questionnaire/page.tsx    # Questionnaire wizard
│   └── preview/page.tsx          # Preview + editor + export
├── components/
│   ├── layout/                   # Header, Footer
│   ├── preview/                  # Editor, Quality report, Export
│   ├── questionnaire/            # Wizard shell, Step renderer
│   │   └── steps/                # 27 step components (step-00 to step-27)
│   └── ui/                       # Reusable components (Button, Input, Card...)
└── lib/
    ├── generation/               # Template engine, OpenAI client, prompt builder
    ├── i18n/                     # Dictionaries (EN/FR), hooks, context
    ├── quality/                  # Checker, rules, types
    ├── questionnaire/            # Schemas (Zod), options, contextual options
    ├── storage/                  # Zustand store, localStorage helper
    ├── templates/                # Canonical templates, helpers
    └── utils/                    # cn(), logger
```

---

## How It Works

```
User answers questionnaire
        |
        v
Zod validation + normalization
        |
        v
Template engine builds CLAUDE.md
        |
        v
(Optional) GPT-4o enhancement
        |
        v
Quality checks + scoring
        |
        v
Preview editor -> Export
```

1. **Fill** the 27-section questionnaire (skip what you don't need)
2. **Generate** a structured `CLAUDE.md` from your answers
3. **Review** the output with a live quality score
4. **Export** as markdown, clipboard, or ZIP

---

## Privacy

- **No database** -- zero server-side persistence
- **No accounts** -- no authentication, no tracking
- **localStorage only** -- all questionnaire data stays in your browser
- **OpenAI opt-in** -- AI enhancement is optional; without it, nothing leaves your machine

---

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

```bash
pnpm dev           # Start development
pnpm typecheck     # Ensure types pass
pnpm lint          # Ensure lint passes
pnpm build         # Ensure build passes
```

---

## License

MIT

---

<p align="center">
  Made with ♥ for developers who want their AI agents to actually understand their projects.
</p>
