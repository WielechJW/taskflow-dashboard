import Link from "next/link";
import { AuthTextField } from "@/components/auth/AuthTextField";

export function LoginForm() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80 sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Logowanie</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Witaj ponownie</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
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
          <label className="inline-flex items-center gap-2 font-semibold text-slate-600">
            <input className="h-4 w-4 rounded border-slate-300 text-indigo-600" name="remember" type="checkbox" />
            Zapamiętaj mnie
          </label>
          <Link className="font-bold text-indigo-600 transition hover:text-indigo-700" href="/login">
            Nie pamiętasz hasła?
          </Link>
        </div>

        <button
          className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-300/80 transition hover:-translate-y-0.5 hover:bg-slate-800"
          type="submit"
        >
          Zaloguj się
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium text-slate-500">
        Nie masz konta?{" "}
        <Link className="font-black text-indigo-600 transition hover:text-indigo-700" href="/register">
          Utwórz konto
        </Link>
      </p>
    </div>
  );
}
