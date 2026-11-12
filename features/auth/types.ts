export interface LoginFormState {
  identity_code: string;
  password: string;
}

export type LoginError = "invalid_credentials" | "throttled" | null;
