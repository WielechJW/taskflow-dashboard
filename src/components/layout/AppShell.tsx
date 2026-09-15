"use client";

import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

type AppShellProps = {
  readonly children: React.ReactNode;
};

const authRoutes = new Set(["/login", "/register"]);

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (authRoutes.has(pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <a href="#main-content" className="retro-button fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0">
        Skip to content
      </a>
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar onOpenMenu={() => setIsMobileMenuOpen(true)} />
          <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {children}
          </main>
          <footer className="mx-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink py-4 font-mono text-[10px] uppercase tracking-widest text-muted sm:mx-8 lg:mx-10">
            <span>TaskFlow / A little order, every day.</span>
            <span>Make room for good work.</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
