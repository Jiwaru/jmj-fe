"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { login } from "../services/auth-service";
import { setAuthToken } from "@/lib/api/token";
import type { ApiErrorResponse } from "@/lib/api/types";
import type { UserRole } from "@/lib/types/user";
import type { LoginError, LoginFormState } from "../types";

const DEFAULT_ROUTE_BY_ROLE: Record<UserRole, string> = {
  field_officer: "/dashboard",
  maintenance_officer: "/dashboard",
  mcs_supervisor: "/dashboard",
  maintenance_unit: "/dashboard",
};

export function useLogin() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<LoginError>(null);

  async function handleLogin(form: LoginFormState) {
    setIsSubmitting(true);
    setError(null);

    try {
      const { token, user } = await login(form);

      setAuthToken(token);
      document.cookie = `jmj_role=${user.role}; path=/`;
      document.cookie = `jmj_identity_code=${user.identity_code}; path=/`;

      router.push(DEFAULT_ROUTE_BY_ROLE[user.role]);
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.response?.status === 429) {
          setError("throttled");
        } else if (err.response?.status === 422) {
          setError("invalid_credentials");
        }
      }
      setIsSubmitting(false);
    }
  }

  return { handleLogin, isSubmitting, error };
}
