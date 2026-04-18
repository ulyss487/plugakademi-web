import { useEffect, useState, useCallback } from "react";
import { apiGet, apiPut, apiPost, apiDelete } from "@/lib/api";
import { useLocation } from "wouter";

interface GmailStatus {
  connected: boolean;
  gmail_address: string;
  last_checked: string | null;
  total_emails: number;
}

interface AmazonEmail {
  gmail_message_id: string;
  from_address: string;
  subject: string;
  snippet: string;
  received_at: string;
  is_read: boolean;
  sms_sent: boolean;
}

interface EmailDetail extends AmazonEmail {
  full_body: string;
  created_at: string;
}

interface EmailsResponse {
  emails: AmazonEmail[];
  total: number;
  unread_count: number;
  page: number;
  limit: number;
  total_pages: number;
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60000) return "Kounye a";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

// ─── NOT CONNECTED VIEW ───────────────────────

function ConnectGmailCard({ onConnect, loading }: { onConnect: () => void; loading: boolean }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-[480px] rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/>
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900">Konekte Gmail ou</h2>
        <p className="mb-6 text-[14px] leading-relaxed text-gray-500">
          Pa janm pèdi yon email Amazon ankò. Konekte Gmail ou pou wè tout mesaj Amazon yo yon sèl kote.
        </p>

        <div className="mb-8 space-y-3 text-left">
          {[
            { icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75", text: "Wè tout email Amazon ou yo yon sèl kote" },
            { icon: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h6", text: "Resevwa SMS alèt imedyatman" },
            { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", text: "Pa bezwen verifye Gmail manyèlman" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              </div>
              <span className="text-[13px] text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>

        <button
          data-testid="connect-gmail-btn"
          onClick={onConnect}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#4285F4] px-5 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#3367D6] disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Konekte Gmail mwen
            </>
          )}
        </button>

        <p className="mt-4 text-[11px] text-gray-400">
          Nou li SÈLMAN email Amazon. Nou pa janm wè lòt email ou yo.
        </p>
      </div>
    </div>
  );
}

// ─── EMAIL DETAIL MODAL ───────────────────────

function EmailDetailModal({
  email,
  onClose,
  onMarkRead,
}: {
  email: EmailDetail | null;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}) {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        data-testid="email-detail-modal"
        className="relative w-full max-w-[640px] max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-bold text-gray-900">{email.subject}</h3>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-gray-500">
                <span>{email.from_address}</span>
                <span>·</span>
                <span>{formatDateTime(email.received_at)}</span>
              </div>
            </div>
            <button
              data-testid="close-email-modal-btn"
              onClick={onClose}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          <pre className="whitespace-pre-wrap break-words font-sans text-[13px] leading-relaxed text-gray-700">
            {email.full_body || email.snippet || "(Pa gen kontni)"}
          </pre>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-3">
          {!email.is_read && (
            <button
              data-testid="mark-read-btn"
              onClick={() => onMarkRead(email.gmail_message_id)}
              className="rounded-lg bg-indigo-50 px-4 py-2 text-[13px] font-medium text-indigo-700 hover:bg-indigo-100"
            >
              Mak kòm Li
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50"
          >
            Fèmen
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────

export default function GmailMonitorPage() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<GmailStatus | null>(null);
  const [emails, setEmails] = useState<EmailsResponse | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<EmailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await apiGet("/gmail/status");
      setStatus(data);
    } catch {
      setStatus({ connected: false, gmail_address: "", last_checked: null, total_emails: 0 });
    }
  }, []);

  const fetchEmails = useCallback(async (p = page) => {
    try {
      const data = await apiGet(`/gmail/emails?page=${p}&limit=20&unread_only=${unreadOnly}`);
      setEmails(data);
    } catch (e: any) {
      console.error("Failed to fetch emails:", e);
    }
  }, [page, unreadOnly]);

  useEffect(() => {
    Promise.all([fetchStatus()]).finally(() => setLoading(false));
  }, [fetchStatus]);

  useEffect(() => {
    if (status?.connected) {
      fetchEmails(page);
    }
  }, [status?.connected, page, unreadOnly, fetchEmails]);

  // Check for ?connected=true in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "true") {
      fetchStatus();
      window.history.replaceState({}, "", "/gmail-monitor");
    }
  }, [fetchStatus]);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const data = await apiGet("/gmail/auth-url");
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (e: any) {
      alert(e.message || "Erè koneksyon Gmail");
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm("Èske ou sèten ou vle dekonekte Gmail ou?")) return;
    setDisconnecting(true);
    try {
      await apiDelete("/gmail/disconnect");
      setStatus({ connected: false, gmail_address: "", last_checked: null, total_emails: 0 });
      setEmails(null);
    } catch (e: any) {
      alert(e.message || "Erè dekoneksyon");
    } finally {
      setDisconnecting(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await apiPost("/gmail/sync-now");
      await fetchStatus();
      await fetchEmails(1);
      if (result.new_emails > 0) {
        alert(`${result.new_emails} nouvo email jwenn!`);
      }
    } catch (e: any) {
      alert(e.message || "Sync echwe");
    } finally {
      setSyncing(false);
    }
  };

  const handleEmailClick = async (emailId: string) => {
    try {
      const detail = await apiGet(`/gmail/emails/${emailId}`);
      setSelectedEmail(detail);
    } catch (e: any) {
      alert("Pa ka chaje email la");
    }
  };

  const handleMarkRead = async (emailId: string) => {
    try {
      await apiPut(`/gmail/emails/${emailId}/read`);
      setSelectedEmail((prev) => prev ? { ...prev, is_read: true } : null);
      await fetchEmails(page);
    } catch (e: any) {
      alert("Erè mak kòm li");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-gray-200 border-t-indigo-600" />
      </div>
    );
  }

  if (!status?.connected) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Amazon Email Monitor</h1>
          <p className="mt-1 text-[14px] text-gray-500">Konekte Gmail ou pou pa janm pèdi yon email Amazon</p>
        </div>
        <ConnectGmailCard onConnect={handleConnect} loading={connecting} />
      </div>
    );
  }

  return (
    <div data-testid="gmail-monitor-page">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Amazon Email Monitor</h1>
          <p className="mt-1 text-[14px] text-gray-500">Tout email Amazon ou yo yon sèl kote</p>
        </div>
        <button
          data-testid="disconnect-gmail-btn"
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-medium text-gray-500 hover:border-red-200 hover:text-red-600 disabled:opacity-50"
        >
          {disconnecting ? "..." : "Dekonekte"}
        </button>
      </div>

      {/* Status Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div data-testid="gmail-connected-badge" className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[12px] font-medium text-emerald-700">Gmail Connecté: {status.gmail_address}</span>
        </div>

        <div className="flex items-center gap-4 text-[12px] text-gray-500">
          <span>{status.total_emails} email Amazon</span>
          {status.last_checked && <span>Dènye sync: {formatDate(status.last_checked)}</span>}
          {emails && <span className="font-medium text-indigo-600">{emails.unread_count} pa li</span>}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-[12px] text-gray-500 cursor-pointer">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => { setUnreadOnly(e.target.checked); setPage(1); }}
              className="h-3.5 w-3.5 rounded border-gray-300 text-indigo-600"
            />
            Pa li sèlman
          </label>
          <button
            data-testid="sync-now-btn"
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-[12px] font-medium text-indigo-700 hover:bg-indigo-100 disabled:opacity-50"
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className={syncing ? "animate-spin" : ""}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
            {syncing ? "Ap sync..." : "Sync Kounye a"}
          </button>
        </div>
      </div>

      {/* Email List */}
      <div className="space-y-2">
        {emails?.emails.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            </div>
            <p className="text-[14px] text-gray-500">
              {unreadOnly ? "Pa gen email pa-li." : "Pa gen email Amazon ankò. Klike \"Sync Kounye a\" pou tcheke."}
            </p>
          </div>
        )}

        {emails?.emails.map((email) => (
          <button
            key={email.gmail_message_id}
            data-testid={`email-card-${email.gmail_message_id}`}
            onClick={() => handleEmailClick(email.gmail_message_id)}
            className={`flex w-full items-start gap-3 rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm ${
              email.is_read ? "border-gray-100" : "border-indigo-100 bg-indigo-50/30"
            }`}
          >
            {/* Unread dot */}
            <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
              {!email.is_read && <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className={`truncate text-[13px] ${email.is_read ? "text-gray-500" : "font-semibold text-gray-900"}`}>
                  {email.from_address}
                </span>
                <span className="shrink-0 text-[11px] text-gray-400">{formatDate(email.received_at)}</span>
              </div>
              <div className={`mt-0.5 truncate text-[13px] ${email.is_read ? "text-gray-600" : "font-medium text-gray-900"}`}>
                {email.subject}
              </div>
              <div className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-gray-400">
                {email.snippet}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Pagination */}
      {emails && emails.total_pages > 1 && (
        <div data-testid="pagination" className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            Présedan
          </button>
          <span className="px-3 text-[13px] text-gray-500">
            Paj {page} / {emails.total_pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(emails.total_pages, p + 1))}
            disabled={page >= emails.total_pages}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40"
          >
            Swivan
          </button>
        </div>
      )}

      {/* Email Detail Modal */}
      <EmailDetailModal
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
        onMarkRead={handleMarkRead}
      />
    </div>
  );
}
