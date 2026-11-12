const TOKEN_COOKIE = "jmj_token";

export function getAuthToken(): string | undefined {
  if (typeof document === "undefined") return undefined;

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${TOKEN_COOKIE}=`))
    ?.split("=")[1];
}

export function setAuthToken(token: string) {
  document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${60 * 60 * 24 * 30}`;
}

export function clearAuthToken() {
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0`;
}
