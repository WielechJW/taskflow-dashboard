import type { TeamMember } from "@/types/team";

const statusStyles: Record<TeamMember["status"], string> = {
  online: "bg-emerald-500",
  focused: "bg-indigo-500",
  away: "bg-amber-400",
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
    <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
        {member.initials}
        <span
          aria-label={statusLabels[member.status]}
          className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${statusStyles[member.status]}`}
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-800">{member.name}</p>
        <p className="truncate text-xs font-semibold text-slate-500">{member.role}</p>
      </div>
    </li>
  );
}
