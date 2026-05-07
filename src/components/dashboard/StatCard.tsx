import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

type StatCardProps = {
  readonly label: string;
  readonly value: string;
  readonly helper: string;
  readonly icon: IconName;
  readonly tone: "blue" | "emerald" | "orange";
};

const toneClasses: Record<StatCardProps["tone"], string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  orange: "bg-orange-50 text-orange-700 ring-orange-100",
};

export function StatCard({ label, value, helper, icon, tone }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className={`rounded-2xl p-3 ring-1 ${toneClasses[tone]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{helper}</p>
    </article>
  );
}
