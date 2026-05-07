import Link from "next/link";
import { primaryNavigation, secondaryNavigation } from "@/constants/navigation";
import type { NavigationItem } from "@/types/navigation";
import { Icon } from "@/components/ui/Icon";

type SidebarNavigationProps = {
  readonly onNavigate?: () => void;
};

function NavigationLink({ item, onNavigate }: { readonly item: NavigationItem; readonly onNavigate?: () => void }) {
  const isActive = item.href === "/";

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
        isActive
          ? "bg-slate-950 text-white shadow-lg shadow-slate-200"
          : "text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm"
      }`}
      href={item.href}
      onClick={onNavigate}
    >
      <Icon
        name={item.icon}
        className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`}
      />
      {item.label}
    </Link>
  );
}

export function SidebarNavigation({ onNavigate }: SidebarNavigationProps) {
  return (
    <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-8">
      <div className="space-y-2">
        {primaryNavigation.map((item) => (
          <NavigationLink key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      <div className="mt-auto space-y-2 border-t border-slate-200 pt-6">
        {secondaryNavigation.map((item) => (
          <NavigationLink key={item.href} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </nav>
  );
}
