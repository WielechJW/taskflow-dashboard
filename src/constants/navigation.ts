import type { NavigationItem } from "@/types/navigation";

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Dashboard", href: "/", icon: "grid" },
  { label: "Tasks", href: "/tasks", icon: "checkCircle" },
  { label: "Calendar", href: "/calendar", icon: "calendar" },
  { label: "Team", href: "/team", icon: "users" },
  { label: "Analytics", href: "/analytics", icon: "analytics" },
];

export const secondaryNavigation: readonly NavigationItem[] = [
  { label: "Settings", href: "/settings", icon: "settings" },
];
