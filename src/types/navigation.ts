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
  | "lock"
  | "mail"
  | "menu"
  | "search"
  | "send"
  | "settings"
  | "sparkles"
  | "user"
  | "users"
  | "x";
