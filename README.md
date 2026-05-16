TaskFlow Dashboard is a responsive SaaS-style task management application built with Next.js App Router, TypeScript, and Tailwind CSS. It includes fully interactive client-side task workflows powered by local React state and typed mock data.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The current app includes a desktop sidebar, sticky top navbar, mobile drawer navigation, dedicated authentication screens, reusable layout/dashboard/task/team/auth components under `src/components`, and typed mock data. The dashboard lives at `/`, `/tasks` hosts a fully local task workspace for creating and managing tasks, `/calendar` visualizes deadlines, `/teams` provides a local team chat experience, and `/login` plus `/register` provide polished authentication entry points.

## Architecture

```text
src/
  app/                  # App Router root layout and pages
  components/
    auth/               # Shared login and registration screen components
    dashboard/          # Dashboard-specific presentation components
    layout/             # Reusable application shell components
    tasks/              # Interactive task workflow components
    team/               # Team chat workspace components
    ui/                 # Small shared UI primitives
  constants/            # Navigation, task status, and priority metadata
  hooks/                # Client-side state management hooks
  services/             # Mock data access layer ready for future API/database integration
  types/                # Shared TypeScript types
  utils/                # Task metrics, filtering, formatting, and sorting helpers
```

## Implemented Features

- Responsive SaaS application shell
- Persistent desktop sidebar navigation
- Sticky top navbar with search and account controls
- Mobile drawer menu for small screens
- Reusable TypeScript components styled with Tailwind CSS
- Dedicated `/tasks` page for fully client-side task creation, editing, deletion, and status updates
- Search and filters for task content, status, and priority
- Typed task data model with status, priority, assignee, tags, due dates, and timestamps
- Initial mock task dataset exposed through a service layer
- Dashboard overview at `/` with task metrics and focus work derived from typed mock data
- Calendar planning page at `/calendar` for task deadlines and upcoming work
- Teams chat page at `/teams` with local message sending and member presence cards
- Authentication entry screens at `/login` and `/register` with responsive forms and shared auth layout

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
