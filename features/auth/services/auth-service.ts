import { apiClient } from "@/lib/api/client";
import type { ApiSuccess } from "@/lib/api/types";
import type { User } from "@/lib/types/user";
import type { LoginFormState } from "../types";

export interface LoginResponseData {
  token: string;
  user: User;
}

export async function login(
  form: LoginFormState
): Promise<LoginResponseData> {
  const response = await apiClient.post<ApiSuccess<LoginResponseData>>(
    "/login",
    form
  );
  return response.data.data;
}
