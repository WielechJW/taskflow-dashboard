import type { TeamMember } from "@/types/team";

const statusStyles: Record<TeamMember["status"], string> = {
  online: "bg-ink",
  focused: "bg-muted",
  away: "bg-white",
};

const statusLabels: Record<TeamMember["status"], string> = {
  online: "Online",
  focused: "Focus mode",
  away: "Away",
};

type TeamMemberCardProps = {
  readonly member: TeamMember;
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <li className="flex items-center gap-3 border-b border-line py-3 last:border-b-0">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] border border-ink bg-white font-mono text-xs font-bold text-ink">
        {member.initials}
        <span
          aria-hidden="true"
          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-ink ${statusStyles[member.status]}`}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-ink">{member.name}</p>
        <p className="truncate text-xs text-muted">{member.role}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted">{statusLabels[member.status]}</p>
      </div>
    </li>
  );
}
