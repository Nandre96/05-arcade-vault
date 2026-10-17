# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arcade Vault: online games platform where players compete for highest score. Developed spec-driven (`/spec` and `/spec-impl` skills from `Klerith/fernando-skills`, installed via `npx skills@latest add Klerith/fernando-skills`). Currently a fresh Create Next App scaffold (only `app/layout.tsx`, `app/page.tsx`, `app/globals.css`).



## Stack notes

- Next.js 16.4 + React 19.3, App Router in `app/` (no `src/`), TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` in `app/globals.css`, theme tokens via `@theme inline`).
- **Next.js has breaking changes vs. training data** (see `AGENTS.md`): read relevant guide in `node_modules/next/dist/docs/` before writing Next code.
- Layouts use globally-available typed helpers, e.g. `LayoutProps<"/">` (no import needed).
- `references/` dir exists for spec/reference material.

## Code conventions

- Interfaces/types NEVER inline in components or pages. Put them in dedicated files: component props in `app/interfaces/components.interface.ts`, route props in `app/interfaces/pages.interface.ts`, domain data types in `app/data/types.ts`.
- Repeated string literal unions (categories, colors, etc.) go in `enum`s under `app/enum/*.enum.ts` (e.g. `Category`, `NeonColor` in `game.enum.ts`). Use the enum member everywhere; never repeat raw literals.
- Static data/constants live in `app/const/*.const.ts`.
