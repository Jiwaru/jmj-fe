import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-bg-subtle px-5">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
