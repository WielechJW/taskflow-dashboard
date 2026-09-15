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
      <label className="font-mono text-xs font-bold text-ink" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3 rounded-[3px] border border-ink bg-white px-3 py-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
        <Icon name={icon} className="h-4 w-4 shrink-0 text-muted" />
        <input
          aria-describedby={helpText ? `${id}-help` : undefined}
          autoComplete={autoComplete}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          id={id}
          name={name}
          placeholder={placeholder}
          required
          type={type}
        />
      </div>
      {helpText ? <p className="mt-2 text-xs leading-5 text-muted" id={`${id}-help`}>{helpText}</p> : null}
    </div>
  );
}
