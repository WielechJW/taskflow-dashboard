<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


# AGENTS.md

## Project Overview
TaskFlow Dashboard is a modern task management web application built as a portfolio-quality project.

The goal of this repository is to simulate a real-world SaaS product development workflow using GitHub, Pull Requests, Issues, CI/CD and AI-assisted development with Codex Cloud.

The application should feel like production software rather than a simple tutorial Todo App.

Core principles:
- clean architecture
- readable code
- reusable components
- strong typing
- scalable folder structure
- consistent UI
- responsive design
- accessibility
- maintainability

---

## Product Vision
TaskFlow helps users organize work efficiently.

Main features:
- create tasks
- edit tasks
- delete tasks
- change task status
- filter tasks
- search tasks
- dashboard statistics
- due dates
- priorities
- dark mode
- responsive mobile UI

Future features:
- authentication
- multi-user workspaces
- comments
- attachments
- notifications
- calendar view
- kanban board
- analytics dashboard

---

## Tech Stack
Framework:
- Next.js (App Router)

Language:
- TypeScript

Styling:
- Tailwind CSS

State:
- React hooks initially
- Context API when needed
- Zustand allowed for larger state management

Database:
- local state initially
- Prisma + PostgreSQL in future iterations

Validation:
- Zod preferred

Forms:
- React Hook Form preferred

Icons:
- lucide-react preferred

Charts:
- recharts preferred

Testing:
- Vitest / Testing Library when added

Deployment:
- Vercel preferred

CI:
- GitHub Actions

---

## Code Style Rules
Always use TypeScript.

Never use:
- any
- large monolithic files
- duplicated code
- inline business logic in JSX
- magic numbers
- deeply nested components

Prefer:
- small components
- descriptive naming
- extracted helpers
- custom hooks
- composition over repetition
- explicit typing

Good:
- TaskCard.tsx
- TaskList.tsx
- TaskFilters.tsx
- DashboardStats.tsx

Bad:
- Component.tsx
- NewComponent.tsx
- Helper.ts
- Utils2.ts

---

## Folder Structure
Use this structure:

src/
  app/
  components/
    ui/
    layout/
    dashboard/
    tasks/
  hooks/
  lib/
  services/
  types/
  constants/
  utils/

Keep files organized.

Avoid dumping everything into components/.

---

## UI Guidelines
Design should feel modern SaaS.

Preferred style:
- clean
- minimal
- spacious
- soft shadows
- rounded corners
- subtle animations
- consistent spacing
- excellent mobile UX

Avoid:
- clutter
- oversized typography
- inconsistent spacing
- random colors
- excessive animations

Use semantic HTML.

Accessibility matters.

---

## Git Workflow
Create feature branches:

feature/task-form
feature/dashboard-layout
feature/task-filters

Fix branches:

fix/mobile-layout
fix/filter-bug

Refactor branches:

refactor/task-state

Commit naming:

feat: add task form
feat: implement dashboard cards
fix: resolve mobile layout issue
refactor: simplify task filtering logic
docs: improve project documentation
chore: update dependencies

Keep commits focused.

Small commits are preferred.

---

## Pull Request Rules
Every change should:
- solve one clear problem
- keep code readable
- pass lint
- build successfully
- avoid unnecessary dependencies

Before opening PR:
run:

npm run lint
npm run build

If tests exist:

npm run test

---

## Coding Expectations For Agents
When implementing features:

1. understand existing architecture
2. keep consistency with current codebase
3. avoid rewriting unrelated code
4. keep components reusable
5. keep styling consistent
6. avoid overengineering
7. explain important architectural decisions in PR notes

When uncertain:
choose simpler implementation.

Clarity over cleverness.

Maintainability over complexity.

---

## README Maintenance
When major features are added:
update README.md.

Document:
- feature
- setup
- architecture
- screenshots if needed

---

## Security
Never commit:
- secrets
- API keys
- .env files
- credentials

Always use environment variables.

---

## Final Goal
Build software that looks production-ready.

Think:
"Would this impress a recruiter or technical lead?"

If yes:
ship it.