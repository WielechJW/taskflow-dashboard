import type { Metadata } from "next";
import { CalendarOverview } from "@/components/calendar/CalendarOverview";

export const metadata: Metadata = {
  title: "Calendar | TaskFlow Dashboard",
  description: "Plan task deadlines and upcoming priorities in the TaskFlow calendar view.",
};

export default function CalendarPage() {
  return <CalendarOverview />;
}
