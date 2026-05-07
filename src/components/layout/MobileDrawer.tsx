import { BrandMark } from "@/components/layout/BrandMark";
import { SidebarNavigation } from "@/components/layout/SidebarNavigation";
import { Icon } from "@/components/ui/Icon";

type MobileDrawerProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        aria-label="Close navigation menu"
        className={`absolute inset-0 bg-slate-950/45 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        type="button"
        onClick={onClose}
      />

      <aside
        aria-label="Mobile navigation"
        className={`relative flex h-full w-[min(22rem,calc(100vw-2rem))] flex-col bg-slate-50 p-5 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <BrandMark />
          <button
            aria-label="Close navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm"
            type="button"
            onClick={onClose}
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex flex-1 flex-col">
          <SidebarNavigation onNavigate={onClose} />
        </div>
      </aside>
    </div>
  );
}
