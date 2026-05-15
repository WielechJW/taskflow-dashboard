import type { TeamMember, TeamMessage } from "@/types/team";

export const teamMembers: readonly TeamMember[] = [
  {
    id: "maya-kowalska",
    name: "Maya Kowalska",
    role: "Product Lead",
    initials: "MK",
    status: "online",
  },
  {
    id: "adam-nowak",
    name: "Adam Nowak",
    role: "Frontend Engineer",
    initials: "AN",
    status: "focused",
  },
  {
    id: "lena-wisniewska",
    name: "Lena Wiśniewska",
    role: "UX Designer",
    initials: "LW",
    status: "away",
  },
  {
    id: "igor-zielinski",
    name: "Igor Zieliński",
    role: "QA Specialist",
    initials: "IZ",
    status: "online",
  },
];

export const currentUser = {
  id: "current-user",
  name: "You",
  role: "TaskFlow Manager",
  initials: "YO",
  status: "online",
} as const;

export const initialTeamMessages: readonly TeamMessage[] = [
  {
    id: "message-1",
    author: teamMembers[0],
    content: "Good morning team! Let's align on the launch tasks before standup.",
    sentAt: "09:12",
    isOwnMessage: false,
  },
  {
    id: "message-2",
    author: currentUser,
    content: "I updated the task priorities and moved the onboarding fixes to today's focus.",
    sentAt: "09:16",
    isOwnMessage: true,
  },
  {
    id: "message-3",
    author: teamMembers[1],
    content: "Great. I can take the responsive QA items after finishing the chat layout review.",
    sentAt: "09:20",
    isOwnMessage: false,
  },
  {
    id: "message-4",
    author: teamMembers[2],
    content: "Design handoff is ready. I added notes for empty states and message spacing.",
    sentAt: "09:24",
    isOwnMessage: false,
  },
];
