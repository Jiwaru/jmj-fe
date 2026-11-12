"use client";

import { useState, type SubmitEvent } from "react";
import { ArrowRight, CreditCard, Lock } from "lucide-react";

import { AppButton } from "@/components/domain/AppButton";
import { AppInput } from "@/components/domain/AppInput";
import { useLogin } from "../hooks/useLogin";
import type { LoginFormState } from "../types";

const INITIAL_FORM: LoginFormState = {
  identity_code: "",
  password: "",
};

function LoginForm() {
  const [form, setForm] = useState<LoginFormState>(INITIAL_FORM);
  const { handleLogin, isSubmitting, error } = useLogin();

  function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    handleLogin(form);
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-semibold text-text">
          Toll Command
        </h1>
        <p className="text-center text-xl font-normal text-text">
          Highway Field Ops
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 rounded-2xl border border-border-strong bg-bg p-6"
      >
        <h2 className="text-2xl font-medium text-text">Masuk Akun</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="identity_code" className="text-sm text-text">
              NIK / ID Pegawai
            </label>
            <AppInput
              id="identity_code"
              icon={<CreditCard className="size-5" />}
              value={form.identity_code}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, identity_code: e.target.value }))
              }
              aria-invalid={error === "invalid_credentials"}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-text">
              Password
            </label>
            <AppInput
              id="password"
              type="password"
              icon={<Lock className="size-5" />}
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              aria-invalid={error === "invalid_credentials"}
              required
            />
          </div>
        </div>

        {error === "invalid_credentials" && (
          <p className="text-sm text-destructive">
            NIK/ID Pegawai atau password salah.
          </p>
        )}
        {error === "throttled" && (
          <p className="text-sm text-destructive">
            Terlalu banyak percobaan. Coba lagi dalam 1 menit.
          </p>
        )}

        <div className="flex flex-col items-center gap-3">
          <AppButton type="submit" variant="primary" disabled={isSubmitting}>
            Masuk <ArrowRight className="size-4" />
          </AppButton>

          <a href="#" className="text-center text-sm text-text-muted hover:underline">
            Lupa Password atau Butuh Bantuan?
          </a>
        </div>
      </form>
    </div>
  );
}

export { LoginForm };
