import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Rejestracja | TaskFlow Dashboard",
  description: "Utwórz konto w TaskFlow Dashboard.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      badge="TaskFlow Dashboard · start in minutes"
      description="Uruchom profesjonalny workspace dla zadań, terminów i zespołu. Zacznij od prostego konta, a potem rozwijaj proces razem z produktem."
      eyebrow="Nowy workspace"
      title="Załóż konto i zbuduj lepszy rytm pracy."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
