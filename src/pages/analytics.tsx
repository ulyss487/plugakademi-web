import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

interface AnalyticsData {
  total_users?: number;
  new_users_today?: number;
  new_users_week?: number;
  active_subscriptions?: number;
  total_courses?: number;
  total_completions?: number;
  ai_tools_usage?: number;
  community_posts?: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/admin/analytics")
      .then(setData)
      .catch(() => setData({}))
      .finally(() => setLoading(false));
  }, []);

  const metrics = [
    { label: "Total Users", value: data.total_users ?? "—", icon: "👥", color: "#6366F1" },
    { label: "New Today", value: data.new_users_today ?? "—", icon: "🆕", color: "#10B981" },
    { label: "New This Week", value: data.new_users_week ?? "—", icon: "📅", color: "#3B82F6" },
    { label: "Active Subs", value: data.active_subscriptions ?? "—", icon: "💳", color: "#EC4899" },
    { label: "Total Courses", value: data.total_courses ?? "—", icon: "📚", color: "#F59E0B" },
    { label: "Completions", value: data.total_completions ?? "—", icon: "🎓", color: "#8B5CF6" },
    { label: "AI Tool Usage", value: data.ai_tools_usage ?? "—", icon: "🤖", color: "#14B8A6" },
    { label: "Community Posts", value: data.community_posts ?? "—", icon: "💬", color: "#F97316" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Analytics</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
          Platform performance metrics
        </p>
      </div>

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Loading analytics...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>
                  {m.label}
                </span>
                <span style={{ fontSize: 18 }}>{m.icon}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
