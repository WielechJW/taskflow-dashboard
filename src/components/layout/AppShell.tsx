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
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <Sidebar />
        <MobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar onOpenMenu={() => setIsMobileMenuOpen(true)} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
