"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation } from "@/constants/navigation";
import { Icon } from "@/components/ui/Icon";

type TopNavbarProps = {
  readonly onOpenMenu: () => void;
};

export function TopNavbar({ onOpenMenu }: TopNavbarProps) {
  const pathname = usePathname();
  const currentPage = primaryNavigation.find((item) => item.href === pathname)?.label ?? "Workspace";

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-white">
      <div className="flex min-h-20 items-center gap-3 px-5 sm:gap-5 sm:px-8 lg:px-10">
        <button
          aria-label="Open navigation menu"
          className="retro-button retro-button-secondary h-11 w-11 shrink-0 p-0 lg:hidden"
          type="button"
          onClick={onOpenMenu}
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            <span className="hidden sm:inline">Workspace / </span>Overview
          </p>
          <h1 className="mt-1 truncate text-sm font-bold text-ink">{currentPage}</h1>
        </div>
        <Link className="hidden items-center gap-2 font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline xl:inline-flex" href="/tasks">
          <Icon name="search" className="h-4 w-4" />
          Find a task
        </Link>
        <Link className="hidden font-mono text-xs font-bold underline-offset-4 hover:underline md:inline-flex" href="/login">Log in</Link>
        <Link className="retro-button hidden sm:inline-flex" href="/register">Sign up <span aria-hidden="true">↗</span></Link>
        <div className="flex items-center gap-3 border-l border-line pl-3 sm:pl-5" aria-label="Alex Chen, Product lead">
          <span className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-ink bg-surface font-mono text-xs font-bold">AC</span>
          <span className="hidden text-left 2xl:block">
            <span className="block text-xs font-bold">Alex Chen</span>
            <span className="block text-[11px] text-muted">Product lead</span>
          </span>
        </div>
      </div>
    </header>
  );
}
