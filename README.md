TaskFlow Dashboard is a responsive SaaS-style task management application shell built with Next.js App Router, TypeScript, and Tailwind CSS.

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

The current shell includes a desktop sidebar, sticky top navbar, mobile drawer navigation, and reusable layout/dashboard components under `src/components`.

## Architecture

```text
src/
  app/                  # App Router root layout and pages
  components/
    dashboard/          # Dashboard-specific presentation components
    layout/             # Reusable application shell components
    ui/                 # Small shared UI primitives
  constants/            # Navigation and app constants
  types/                # Shared TypeScript types
```

## Implemented Features

- Responsive SaaS application shell
- Persistent desktop sidebar navigation
- Sticky top navbar with search and account controls
- Mobile drawer menu for small screens
- Reusable TypeScript components styled with Tailwind CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
