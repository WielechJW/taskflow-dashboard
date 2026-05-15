import type { Metadata } from "next";
import { TeamChatWorkspace } from "@/components/team/TeamChatWorkspace";

export const metadata: Metadata = {
  title: "Teams | TaskFlow Dashboard",
  description: "Coordinate task decisions with a local team chat experience in TaskFlow.",
};

export default function TeamsPage() {
  return <TeamChatWorkspace />;
}
