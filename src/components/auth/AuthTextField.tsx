import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/types/navigation";

type AuthTextFieldProps = {
  readonly autoComplete: string;
  readonly helpText?: string;
  readonly icon: IconName;
  readonly id: string;
  readonly label: string;
  readonly name: string;
  readonly placeholder: string;
  readonly type: "email" | "password" | "text";
};

export function AuthTextField({
  autoComplete,
  helpText,
  icon,
  id,
  label,
  name,
  placeholder,
  type,
}: AuthTextFieldProps) {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
        <Icon name={icon} className="h-5 w-5 text-slate-400" />
        <input
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          id={id}
          name={name}
          placeholder={placeholder}
          required
          type={type}
        />
      </div>
      {helpText ? <p className="mt-2 text-xs font-medium text-slate-500">{helpText}</p> : null}
    </div>
  );
}
