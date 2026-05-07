import { BrandMark } from "@/components/layout/BrandMark";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-50/80 px-5 py-6 lg:flex lg:flex-col">
      <BrandMark />
      <div className="mt-10 flex flex-1 flex-col">
        <SidebarNavigation />
      </div>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-950">Launch readiness</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Keep priority work, deadlines, and team focus visible in one clean workspace.
        </p>
      </div>
    </aside>
  );
}
