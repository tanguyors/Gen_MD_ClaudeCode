<div align="center">

```
  ____ _                 _      __  __ ____
 / ___| | __ _ _   _  __| | ___|  \/  |  _ \
| |   | |/ _` | | | |/ _` |/ _ \ |\/| | | | |
| |___| | (_| | |_| | (_| |  __/ |  | | |_| |
 \____|_|\__,_|\__,_|\__,_|\___|_|  |_|____/
              Generator
```

### Generate perfect CLAUDE.md files from a guided questionnaire.

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GPT-4o](https://img.shields.io/badge/GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License](https://img.shields.io/badge/MIT-green?style=for-the-badge)](LICENSE)

[**Live Demo**](https://gen-md-claude-code.vercel.app)

</div>

---

## The Problem

AI coding agents are powerful — but they know nothing about your project. Without context, they guess your stack, invent conventions, and produce inconsistent code.

## The Solution

A `CLAUDE.md` file at the root of your project acts as a briefing document the agent reads before working. **ClaudeMD Generator** produces this file automatically through a **27-section guided questionnaire** — with optional GPT-4o enhancement.

> **Answer questions. Get a perfect CLAUDE.md. Ship better code.**

---

## Features

```bash
$ claudemd --capabilities
```

| Feature | Description |
|---------|-------------|
| **27-Section Questionnaire** | Covers identity, stack, commands, security, testing, CI/CD, and more |
| **Smart Defaults** | Contextual options adapt based on your project type |
| **"Let Claude Decide"** | Novice-friendly button — let the AI figure out your stack |
| **GPT-4o Enhancement** | Optional AI pass to polish and enrich the output |
| **Quality Report** | Automated scoring with coverage, verbosity, and rule checks |
| **Live Editor** | Edit the generated markdown before exporting |
| **Multi-Export** | Download as `.md`, copy to clipboard, or export as ZIP |
| **i18n** | Full English and French support |
| **MCP Integrations** | Enable MCP tool blocks directly in your output |
| **100% Client-Side** | All data stays in your browser — no database, no accounts |

---

## Architecture

```
claudemd-generator/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # Generation + quality check endpoints
│   │   ├── questionnaire/# Wizard interface
│   │   └── preview/      # Editor + export
│   ├── components/
│   │   ├── questionnaire/# 27 step components
│   │   ├── preview/      # Editor, quality report, export
│   │   └── ui/           # Reusable components
│   └── lib/
│       ├── generation/   # Template engine, OpenAI client
│       ├── i18n/         # EN/FR dictionaries
│       ├── quality/      # Checker, rules, scoring
│       └── storage/      # Zustand + localStorage
├── public/
└── .claude/
```

---

## Tech Stack

```python
stack = {
    "framework":  ["Next.js 16 (App Router)"],
    "language":   ["TypeScript 5 (strict)"],
    "styling":    ["Tailwind CSS 4"],
    "state":      ["Zustand (persisted localStorage)"],
    "forms":      ["React Hook Form + Zod"],
    "ai":         ["OpenAI GPT-4o (optional)"],
    "animation":  ["Framer Motion"],
    "testing":    ["Vitest + React Testing Library"],
    "analytics":  ["Vercel Analytics"]
}
```

---

## How It Works

```
Answer questionnaire → Zod validation → Template engine
                                            ↓
                               (Optional) GPT-4o enhancement
                                            ↓
                                Quality checks + scoring
                                            ↓
                                Preview editor → Export
```

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/tanguyors/claudemd-generator.git
cd claudemd-generator

# Install dependencies
pnpm install

# Set up environment (optional — for AI enhancement)
cp .env.example .env.local
# Add OPENAI_API_KEY=sk-... to .env.local

# Run locally
pnpm dev
```

> The app works fully without an API key. AI enhancement is opt-in.

---

## Privacy

```
No database     → zero server-side persistence
No accounts     → no authentication, no tracking
localStorage    → all data stays in your browser
OpenAI opt-in   → nothing leaves your machine without consent
```

---

## Stats

```
 17 commits  |  17 deployments  |  TypeScript 99.9%
  2 contributors  |  MIT License  |  Production-ready
```

---

<div align="center">

**Built by [@tanguyors](https://github.com/tanguyors)**

*Give your AI agent the context it deserves.*

</div>
