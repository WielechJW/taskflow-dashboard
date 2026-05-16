import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type TopNavbarProps = {
  readonly onOpenMenu: () => void;
};

export function TopNavbar({ onOpenMenu }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="flex min-h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          aria-label="Open navigation menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 lg:hidden"
          type="button"
          onClick={onOpenMenu}
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">Welcome back, Alex</p>
          <h1 className="truncate text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            TaskFlow Dashboard
          </h1>
        </div>

        <label className="hidden min-w-72 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 shadow-inner xl:flex">
          <Icon name="search" className="h-4 w-4 text-slate-400" />
          <span className="sr-only">Search tasks</span>
          <input
            className="w-full bg-transparent font-medium text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search tasks, projects..."
            type="search"
          />
        </label>

        <Link
          className="hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 md:inline-flex"
          href="/login"
        >
          Log in
        </Link>

        <Link
          className="hidden rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300/70 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
          href="/register"
        >
          Sign up
        </Link>

        <button
          aria-label="Open account menu"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 pr-3 shadow-sm transition hover:border-slate-300"
          type="button"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
            AC
          </span>
          <span className="hidden text-left md:block">
            <span className="block text-sm font-bold text-slate-950">Alex Chen</span>
            <span className="block text-xs font-medium text-slate-500">Product lead</span>
          </span>
          <Icon name="chevronDown" className="hidden h-4 w-4 text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}
