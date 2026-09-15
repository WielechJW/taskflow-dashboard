import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

type StatCardProps = {
  readonly label: string;
  readonly value: string;
  readonly helper: string;
  readonly icon: IconName;
};

export function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <article className="retro-panel flex flex-col p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="retro-eyebrow">{label}</p>
          <p className="mt-3 font-display text-4xl tracking-tight text-ink">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-ink bg-surface">
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 border-t border-line pt-3 text-xs leading-5 text-muted">{helper}</p>
    </article>
  );
}
