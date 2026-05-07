import { Icon } from "@/components/ui/Icon";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="TaskFlow Dashboard">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-300/60">
        <Icon name="sparkles" className="h-5 w-5" />
      </div>
      <div>
        <p className="text-base font-bold tracking-tight text-slate-950">TaskFlow</p>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
          Dashboard
        </p>
      </div>
    </div>
  );
}
