import Link from "next/link";
import type React from "react";
import { BrandMark } from "@/components/layout/BrandMark";
import { Icon } from "@/components/ui/Icon";

type AuthLayoutProps = {
  readonly badge: string;
  readonly children: React.ReactNode;
  readonly description: string;
  readonly eyebrow: string;
  readonly title: string;
};

const trustSignals = ["Szybki onboarding", "Bezpieczne workspace", "Gotowe do pracy zespołowej"] as const;

export function AuthLayout({ badge, children, description, eyebrow, title }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <section className="min-w-0 border-b border-ink px-6 py-7 sm:px-10 lg:border-r lg:border-b-0 lg:px-14">
          <div className="flex min-h-full flex-col">
            <Link
              aria-label="Wróć do dashboardu TaskFlow"
              className="w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              href="/"
            >
              <BrandMark />
            </Link>

            <div className="flex flex-1 items-center py-10 lg:py-20">
              <div className="min-w-0 w-full max-w-xl">
                <p className="retro-badge">
                  {eyebrow}
                </p>
                <h1 className="retro-title mt-6 max-w-lg leading-tight">
                  {title}
                </h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted">{description}</p>

                <div className="mt-8 hidden divide-y divide-line border-y border-ink sm:block">
                  {trustSignals.map((signal) => (
                    <div key={signal} className="flex items-center gap-3 py-4">
                      <Icon name="checkCircle" className="h-4 w-4 shrink-0 text-ink" />
                      <p className="font-mono text-xs leading-5 text-ink">{signal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{badge}</p>
          </div>
        </section>

        <section className="retro-pattern flex min-w-0 items-center justify-center bg-surface px-5 py-10 sm:px-10 lg:px-14">
          <div className="min-w-0 w-full max-w-lg">{children}</div>
        </section>
      </div>
    </main>
  );
}
