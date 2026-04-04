import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

interface ContentItem {
  id?: string;
  _id?: string;
  title: string;
  type?: string;
  category?: string;
  created_at?: string;
  status?: string;
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("meetings");

  const tabs = [
    { key: "meetings", label: "Replay Meetings", endpoint: "/admin/replay-meetings" },
    { key: "materials", label: "Seller Materials", endpoint: "/admin/seller-materials" },
    { key: "updates", label: "Amazon Updates", endpoint: "/admin/amazon-updates" },
  ];

  useEffect(() => {
    const tab = tabs.find((t) => t.key === activeTab);
    if (!tab) return;
    setLoading(true);
    apiGet(tab.endpoint)
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Content</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
          Manage platform content
        </p>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 8 }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer",
              background: activeTab === t.key ? "rgba(245,158,11,0.15)" : "transparent",
              color: activeTab === t.key ? "#F59E0B" : "rgba(255,255,255,0.4)",
              fontSize: 13, fontWeight: activeTab === t.key ? 600 : 400,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Loading content...</div>
      ) : (
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Title", "Type", "Category", "Status", "Created"].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id || item._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#fff" }}>{item.title}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    {item.type || "—"}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    {item.category || "—"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                      background: item.status === "published" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                      color: item.status === "published" ? "#10B981" : "#F59E0B",
                    }}>
                      {item.status || "draft"}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div style={{ padding: 32, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              No content found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
