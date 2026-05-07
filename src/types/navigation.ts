export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
};

export type IconName =
  | "analytics"
  | "calendar"
  | "checkCircle"
  | "chevronDown"
  | "grid"
  | "menu"
  | "search"
  | "settings"
  | "sparkles"
  | "users"
  | "x";
