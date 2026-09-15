import { Icon } from "@/components/ui/Icon";

export function BrandMark() {
  return (
    <div className="flex items-center gap-3" aria-label="TaskFlow Dashboard">
      <div className="flex h-10 w-10 items-center justify-center rounded-[3px] border-2 border-ink bg-white text-ink shadow-[3px_3px_0_#1c1c1c]">
        <Icon name="grid" className="h-6 w-6" />
      </div>
      <div>
        <p className="font-display text-2xl font-bold leading-none tracking-tight text-ink">TaskFlow<span aria-hidden="true">.</span></p>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Your daily workspace</p>
      </div>
    </div>
  );
}
