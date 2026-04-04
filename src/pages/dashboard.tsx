import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

interface Stats {
  total_users?: number;
  active_users?: number;
  total_courses?: number;
  total_revenue?: number;
}

const CARDS = [
  { key: "total_users", label: "Total Users", color: "text-indigo-600", bg: "bg-indigo-50", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg> },
  { key: "active_users", label: "Active Users", color: "text-emerald-600", bg: "bg-emerald-50", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
  { key: "total_courses", label: "Courses", color: "text-amber-600", bg: "bg-amber-50", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg> },
  { key: "total_revenue", label: "Revenue", color: "text-violet-600", bg: "bg-violet-50", format: "currency", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/admin/stats")
      .then(setStats)
      .catch((e) => { setError(e.message); setStats({}); })
      .finally(() => setLoading(false));
  }, []);

  const getValue = (key: string, format?: string) => {
    const v = (stats as any)[key];
    if (v == null) return "—";
    return format === "currency" ? `$${v.toLocaleString()}` : v.toLocaleString();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-1 text-[14px] text-gray-500">Overview of your platform</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="text-[14px] text-gray-400">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((card) => (
            <div key={card.key} className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[13px] font-medium text-gray-500">{card.label}</span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg} ${card.color}`}>{card.icon}</div>
              </div>
              <div className={`text-[28px] font-extrabold tracking-tight ${card.color}`}>{getValue(card.key, card.format)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
