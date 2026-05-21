import type { Metadata } from "next";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";

export const metadata: Metadata = {
  title: "Analytics | TaskFlow Dashboard",
  description: "Sample analytics dashboard with task KPIs and status distribution.",
};

export default function AnalyticsPage() {
  return <AnalyticsOverview />;
}
