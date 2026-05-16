import Link from "next/link";
import { AuthTextField } from "@/components/auth/AuthTextField";

export function RegisterForm() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/80 sm:p-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Rejestracja</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Załóż konto TaskFlow</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
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

        <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-600">
          <input className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600" name="terms" required type="checkbox" />
          <span>
            Akceptuję regulamin i zgodę na przetwarzanie danych w celu obsługi konta TaskFlow.
          </span>
        </label>

        <button
          className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-300/80 transition hover:-translate-y-0.5 hover:bg-slate-800"
          type="submit"
        >
          Utwórz konto
        </button>
      </form>

      <p className="mt-8 text-center text-sm font-medium text-slate-500">
        Masz już konto?{" "}
        <Link className="font-black text-indigo-600 transition hover:text-indigo-700" href="/login">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}
