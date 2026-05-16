import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Logowanie | TaskFlow Dashboard",
  description: "Zaloguj się do panelu TaskFlow Dashboard.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      badge="TaskFlow Dashboard · secure access"
      description="Kontynuuj pracę bez rozpraszania. TaskFlow porządkuje zadania, priorytety i terminy w nowoczesnym panelu SaaS."
      eyebrow="Dostęp do workspace"
      title="Zaloguj się i przejmij kontrolę nad swoim dniem."
    >
      <LoginForm />
    </AuthLayout>
  );
}
