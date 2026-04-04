import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

interface Stats {
  total_users?: number;
  active_users?: number;
  total_courses?: number;
  total_revenue?: number;
}

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

  const cards = [
    { label: "Total Users", value: stats.total_users ?? "—", icon: "👥", color: "#6366F1" },
    { label: "Active Users", value: stats.active_users ?? "—", icon: "🟢", color: "#10B981" },
    { label: "Courses", value: stats.total_courses ?? "—", icon: "📚", color: "#F59E0B" },
    { label: "Revenue", value: stats.total_revenue ? `$${stats.total_revenue.toLocaleString()}` : "—", icon: "💰", color: "#EC4899" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
          Overview of your platform
        </p>
      </div>

      {error && (
        <div style={{
          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 8, padding: "12px 16px", marginBottom: 16, color: "#EF4444", fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Loading stats...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {cards.map((card) => (
            <div key={card.label} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                  {card.label}
                </span>
                <span style={{ fontSize: 20 }}>{card.icon}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
