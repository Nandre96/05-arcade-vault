# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arcade Vault: online games platform where players compete for highest score. Developed spec-driven (`/spec` and `/spec-impl` skills from `Klerith/fernando-skills`, installed via `npx skills@latest add Klerith/fernando-skills`). Currently a fresh Create Next App scaffold (only `app/layout.tsx`, `app/page.tsx`, `app/globals.css`).

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- No test runner configured.

## Stack notes

- Next.js 16.4 + React 19.3, App Router in `app/` (no `src/`), TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` in `app/globals.css`, theme tokens via `@theme inline`).
- **Next.js has breaking changes vs. training data** (see `AGENTS.md`): read relevant guide in `node_modules/next/dist/docs/` before writing Next code.
- Layouts use globally-available typed helpers, e.g. `LayoutProps<"/">` (no import needed).
- `references/` dir exists for spec/reference material.
