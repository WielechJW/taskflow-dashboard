"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation, secondaryNavigation } from "@/constants/navigation";
import type { NavigationItem } from "@/types/navigation";
import { Icon } from "@/components/ui/Icon";

type SidebarNavigationProps = {
  readonly onNavigate?: () => void;
};

function isNavigationItemActive(itemHref: string, pathname: string): boolean {
  return itemHref === "/" ? pathname === itemHref : pathname.startsWith(itemHref);
}

function NavigationLink({
  item,
  pathname,
  onNavigate,
}: {
  readonly item: NavigationItem;
  readonly pathname: string;
  readonly onNavigate?: () => void;
}) {
  const isActive = isNavigationItemActive(item.href, pathname);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`group flex min-h-11 items-center gap-3 rounded-[3px] border px-3 py-3 text-sm font-semibold transition-colors ${
        isActive
          ? "border-ink bg-ink text-white shadow-[3px_3px_0_#c6c6c6]"
          : "border-transparent text-muted hover:border-ink hover:bg-surface hover:text-ink"
      }`}
      href={item.href}
      onClick={onNavigate}
    >
      <Icon
        name={item.icon}
        className="h-[18px] w-[18px]"
      />
      {item.label}
      {isActive && <span aria-hidden="true" className="ml-auto font-mono">↗</span>}
    </Link>
  );
}

export function SidebarNavigation({ onNavigate }: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-8">
      <div className="space-y-2">
        <p className="retro-eyebrow mb-3 px-3">The essentials</p>
        {primaryNavigation.map((item) => (
          <NavigationLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="mt-auto space-y-2 border-t border-line pt-6">
        {secondaryNavigation.map((item) => (
          <NavigationLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
        ))}
      </div>
    </nav>
  );
}
