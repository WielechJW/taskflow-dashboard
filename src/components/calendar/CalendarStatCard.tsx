type CalendarStatCardProps = {
  readonly label: string;
  readonly value: number;
  readonly helper: string;
};

export function CalendarStatCard({ label, value, helper }: CalendarStatCardProps) {
  return (
    <article className="retro-panel p-5">
      <p className="retro-eyebrow">{label}</p>
      <p className="mt-3 font-display text-4xl text-ink">{value}</p>
      <p className="mt-2 text-xs leading-5 text-muted">{helper}</p>
    </article>
  );
}
