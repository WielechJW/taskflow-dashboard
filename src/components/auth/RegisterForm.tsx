import Link from "next/link";
import { AuthTextField } from "@/components/auth/AuthTextField";

export function RegisterForm() {
  return (
    <div className="retro-panel p-6 sm:p-8">
      <div>
        <p className="retro-eyebrow">Rejestracja</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Załóż konto TaskFlow.</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Stwórz workspace, zaproś zespół i zacznij planować priorytety w jednym miejscu.
        </p>
      </div>

      <form className="mt-8 space-y-5" action="#">
        <AuthTextField
          autoComplete="name"
          icon="user"
          id="register-name"
          label="Imię i nazwisko"
          name="name"
          placeholder="Alex Chen"
          type="text"
        />
        <AuthTextField
          autoComplete="email"
          icon="mail"
          id="register-email"
          label="Adres e-mail"
          name="email"
          placeholder="alex@taskflow.app"
          type="email"
        />
        <AuthTextField
          autoComplete="new-password"
          helpText="Minimum 8 znaków, w tym cyfra i wielka litera."
          icon="lock"
          id="register-password"
          label="Hasło"
          name="password"
          placeholder="Utwórz bezpieczne hasło"
          type="password"
        />

        <label className="flex items-start gap-3 border-y border-line py-4 text-xs leading-6 text-muted">
          <input className="mt-1 h-4 w-4 shrink-0 accent-ink" name="terms" required type="checkbox" />
          <span>
            Akceptuję regulamin i zgodę na przetwarzanie danych w celu obsługi konta TaskFlow.
          </span>
        </label>

        <button
          className="retro-button w-full"
          type="submit"
        >
          Utwórz konto
        </button>
      </form>

      <p className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
        Masz już konto?{" "}
        <Link className="font-bold text-ink underline underline-offset-4 hover:decoration-2" href="/login">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
