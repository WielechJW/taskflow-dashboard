import { BrandMark } from "@/components/layout/BrandMark";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import { Icon } from "@/components/ui/Icon";

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r-2 border-ink bg-white px-5 py-7 lg:flex lg:flex-col xl:w-64">
      <BrandMark />
      <div className="mt-10 border-y border-ink py-3">
        <p className="retro-eyebrow">Workspace / 01</p>
        <p className="mt-1 text-sm font-semibold">Personal workspace</p>
      </div>
      <div className="mt-7 flex flex-1 flex-col">
        <SidebarNavigation />
      </div>
      <div className="retro-panel retro-pattern mt-8 p-4">
        <Icon name="sparkles" className="h-6 w-6" />
        <p className="mt-3 font-display text-xl">Less noise.<br />More focus.</p>
        <p className="mt-2 text-xs leading-5 text-muted">One task at a time. You&apos;ve got this.</p>
      </div>
      <p className="mt-6 font-mono text-[9px] uppercase tracking-widest text-muted">A space to get things done.</p>
    </aside>
  );
}
