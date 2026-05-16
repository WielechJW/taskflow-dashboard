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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.35),_transparent_32rem),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.24),_transparent_30rem)]" />
          <div className="relative z-10 flex min-h-full flex-col">
            <Link
              aria-label="Wróć do dashboardu TaskFlow"
              className="w-fit rounded-2xl bg-white/95 p-3 text-slate-950 shadow-2xl shadow-indigo-950/30 transition hover:-translate-y-0.5"
              href="/"
            >
              <BrandMark />
            </Link>

            <div className="flex flex-1 items-center py-16">
              <div className="max-w-2xl">
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100 backdrop-blur">
                  {eyebrow}
                </p>
                <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{description}</p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {trustSignals.map((signal) => (
                    <div key={signal} className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                      <Icon name="checkCircle" className="h-5 w-5 text-emerald-300" />
                      <p className="mt-3 text-sm font-semibold leading-5 text-slate-100">{signal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-400">{badge}</p>
          </div>
        </section>

        <section className="flex items-center justify-center bg-slate-100 px-4 py-10 text-slate-950 sm:px-6 lg:px-10">
          <div className="w-full max-w-xl">{children}</div>
        </section>
      </div>
    </main>
  );
}
