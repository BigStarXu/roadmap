import Cookies from "js-cookie";

export const TOKEN_COOKIE_NAME = "__roadmap_jt__";
export const FIRST_LOGIN_PARAM = "fl" as const;

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export function decodeToken(token: string): TokenPayload {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token decode error:", error);
    return {} as TokenPayload;
  }
}

export function isLoggedIn(): boolean {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  return !!token;
}

export function getUser(): TokenPayload | null {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  return decodeToken(token);
}

export function setAuthToken(token: string): void {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    path: "/",
    expires: 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeAuthToken(): void {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: "/",
  });
}
