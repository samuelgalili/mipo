# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MIPO Design System — a React UI component library for the MIPO platform (multi-pet app with Hebrew localization), styled entirely with Tailwind CSS. The platform supports all pet types — dogs, cats, rabbits, parrots, and more. No build tooling is configured; components are meant to be imported directly into a React project that already has Tailwind CSS set up.

## Architecture

All components live in `components/` and are exported from `components/index.js`. There is no TypeScript, no bundler config, and no package.json — this is a raw JSX component library.

**Toast system** uses React Context API: wrap the app in `<MipoToastProvider>` and trigger toasts via the `useToast()` hook inside any child component.

## Design Language

All components share a consistent Aurora Purple theme:

- **Primary gradient:** `from-purple-500 via-violet-500 to-fuchsia-500`
- **Ring:** `ring-purple-200`
- **Border:** `border-purple-100`
- **Shadow:** `shadow-purple-100/40`
- **Border radius:** `rounded-2xl` (buttons), `rounded-3xl` (cards/modals), `rounded-xl` (inputs)
- **Transition:** `duration-300 ease-in-out`

When adding or modifying components, maintain these tokens for visual consistency.

## Component Conventions

- Stateless functional components with React hooks
- Props follow established patterns: `variant`, `size`, `label`, `onClick`, `className`, `disabled`, `loading`
- Export all components from `components/index.js`
- Pet-themed emoji usage (🐾) is intentional and part of the brand
