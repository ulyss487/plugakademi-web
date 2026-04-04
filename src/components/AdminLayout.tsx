import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/users", label: "Users", icon: "👥" },
  { path: "/courses", label: "Courses", icon: "📚" },
  { path: "/content", label: "Content", icon: "📄" },
  { path: "/analytics", label: "Analytics", icon: "📈" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, logout } = useAuth();
  const [location, setLocation] = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A14" }}>
      <aside style={{
        width: 240, background: "#0F1120", borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0,
      }}>
        <div style={{
          padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "#000",
          }}>P</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
              Plug <span style={{ color: "#F59E0B" }}>Akademi</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Admin Panel</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map((item) => {
            const active = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 8, border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400,
                  background: active ? "rgba(245,158,11,0.12)" : "transparent",
                  color: active ? "#F59E0B" : "rgba(255,255,255,0.55)",
                  transition: "all 0.15s", textAlign: "left", width: "100%",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{
          padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", gap: 8,
        }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", padding: "0 4px" }}>
            {profile?.email}
          </div>
          <div style={{
            fontSize: 10, color: "#F59E0B", textTransform: "uppercase",
            fontWeight: 700, padding: "0 4px", letterSpacing: 1,
          }}>
            {profile?.role}
          </div>
          <button
            onClick={logout}
            style={{
              padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.3)",
              background: "rgba(239,68,68,0.08)", color: "#EF4444",
              fontSize: 12, fontWeight: 500, cursor: "pointer", marginTop: 4,
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, padding: "24px 32px" }}>
        {children}
      </main>
    </div>
  );
}
