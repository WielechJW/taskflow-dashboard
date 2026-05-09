type CalendarStatCardProps = {
  readonly label: string;
  readonly value: number;
  readonly helper: string;
};

export function CalendarStatCard({ label, value, helper }: CalendarStatCardProps) {
  return (
    <article className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-sm shadow-slate-200/80">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{helper}</p>
    </article>
  );
}
