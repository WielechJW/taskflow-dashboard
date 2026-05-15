export type TeamMemberStatus = "online" | "focused" | "away";

export type TeamMember = {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly status: TeamMemberStatus;
};

export type TeamMessageAuthor = TeamMember | {
  readonly id: "current-user";
  readonly name: "You";
  readonly role: "TaskFlow Manager";
  readonly initials: "YO";
  readonly status: "online";
};

export type TeamMessage = {
  readonly id: string;
  readonly author: TeamMessageAuthor;
  readonly content: string;
  readonly sentAt: string;
  readonly isOwnMessage: boolean;
};

export type NewTeamMessage = {
  readonly content: string;
};
