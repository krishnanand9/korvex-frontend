import { EnquiryPayload, EnquiryRecord, ChatMessage } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean; id?: string; error?: string; fields?: Record<string, string[]>; emailed?: boolean; analysis?: any }> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok || !data.emailed) {
      return {
        ok: false,
        error: data.error || (data.fields ? "Please check the highlighted fields." : "Email delivery could not be confirmed by the server."),
        fields: data.fields,
        emailed: false,
      };
    }
    return { ok: true, id: data.id, emailed: true, analysis: data.analysis };
  } catch (err: any) {
    return {
      ok: false,
      error: "Network error. The server could not be reached. Please check your network connection or email us directly.",
      emailed: false,
    };
  }
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<{ reply: string; mode?: "llm" | "rules" | "fallback"; suggested_questions?: string[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { reply: "I'm temporarily experiencing connectivity issues. Please use our Contact page or email us.", error: data.error };
    }
    return data;
  } catch {
    return {
      reply: "The AI assistant service is temporarily unreachable. You can continue exploring the website, use the Project Estimator, or submit a direct enquiry.",
      mode: "fallback",
    };
  }
}

export async function adminLogin(password: string): Promise<{ ok: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { ok: false, error: data.error || "Login failed." };
    }
    return { ok: true, token: data.token };
  } catch {
    return { ok: false, error: "Network error connecting to auth server." };
  }
}

export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchAdminStats(token: string): Promise<{ total: number; byStatus: Record<string, number>; byCategory: Record<string, number>; highPriority: number } | null> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchAdminEnquiries(
  token: string,
  params: { status?: string; search?: string; page?: number; limit?: number } = {}
): Promise<{ total: number; page: number; limit: number; totalPages: number; enquiries: EnquiryRecord[] } | null> {
  try {
    const query = new URLSearchParams();
    if (params.status) query.set("status", params.status);
    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const res = await fetch(`${API_BASE}/api/admin/enquiries?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateEnquiryStatus(
  token: string,
  id: string,
  status: "new" | "reviewing" | "contacted" | "archived",
  notes?: string
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, notes }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function getExportEnquiriesUrl(token: string, format: "csv" | "json" = "csv"): string {
  return `${API_BASE}/api/admin/enquiries/export?format=${format}`;
}

export async function fetchSystemHealth(): Promise<{ ok: boolean; service?: string; emailConfigured?: boolean; aiEngine?: any }> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    return await res.json();
  } catch {
    return { ok: false };
  }
}
