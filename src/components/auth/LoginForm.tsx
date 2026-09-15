import Link from "next/link";
import { AuthTextField } from "@/components/auth/AuthTextField";

export function LoginForm() {
  return (
    <div className="retro-panel p-6 sm:p-8">
      <div>
        <p className="retro-eyebrow">Logowanie</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Witaj ponownie.</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          Zaloguj się, aby wrócić do swoich zadań, terminów i współpracy zespołowej.
        </p>
      </div>

      <form className="mt-8 space-y-5" action="#">
        <AuthTextField
          autoComplete="email"
          icon="mail"
          id="login-email"
          label="Adres e-mail"
          name="email"
          placeholder="alex@taskflow.app"
          type="email"
        />
        <AuthTextField
          autoComplete="current-password"
          icon="lock"
          id="login-password"
          label="Hasło"
          name="password"
          placeholder="Wpisz hasło"
          type="password"
        />

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-2 text-muted">
            <input className="h-4 w-4 accent-ink" name="remember" type="checkbox" />
            Zapamiętaj mnie
          </label>
          <Link className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink" href="/login">
            Nie pamiętasz hasła?
          </Link>
        </div>

        <button
          className="retro-button w-full"
          type="submit"
        >
          Zaloguj się
        </button>
      </form>

      <p className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
        Nie masz konta?{" "}
        <Link className="font-bold text-ink underline underline-offset-4 hover:decoration-2" href="/register">
          Utwórz konto
        </Link>
      </p>
    </div>
  );
}
