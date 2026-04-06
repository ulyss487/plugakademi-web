import { auth } from "@/config/firebase";

const API_BASE = "https://api.plugakademi.org/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const user = auth.currentUser;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (user) {
    const token = await user.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
    headers["x-admin-id"] = user.uid;
    headers["x-admin-name"] = user.displayName || user.email || "Admin";
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.detail || "Unauthorized");
    (err as any).status = res.status;
    throw err;
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `API error ${res.status}`);
  }

  return res.json();
}

export function apiGet(path: string) {
  return apiFetch(path);
}

export function apiPost(path: string, data?: unknown) {
  return apiFetch(path, { method: "POST", body: JSON.stringify(data) });
}

export function apiPut(path: string, data?: unknown) {
  return apiFetch(path, { method: "PUT", body: JSON.stringify(data) });
}

export function apiDelete(path: string) {
  return apiFetch(path, { method: "DELETE" });
}
