import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";

interface UserRecord {
  uid: string;
  email: string;
  name?: string;
  role: string;
  subscription_tier?: string;
  created_at?: string;
  last_login?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUid, setEditUid] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");

  const fetchUsers = () => {
    setLoading(true);
    apiGet("/admin/users")
      .then((data) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (uid: string) => {
    try {
      await apiPut(`/admin/users/${uid}/role`, { role: editRole });
      setEditUid(null);
      fetchUsers();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.email?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Users</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
            {users.length} registered users
          </p>
        </div>
        <input
          type="text" placeholder="Search users..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 13, width: 240,
          }}
        />
      </div>

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Loading users...</div>
      ) : (
        <div style={{
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12, overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {["Email", "Name", "Role", "Tier", "Joined", "Actions"].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600,
                    color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.uid} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#fff" }}>{u.email}</td>
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                    {u.name || "—"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    {editUid === u.uid ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        style={{
                          background: "#1a1a2e", color: "#fff", border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 4, padding: "4px 8px", fontSize: 12,
                        }}
                      >
                        {["free", "basic", "premium", "admin", "owner"].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    ) : (
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                        background: u.role === "admin" || u.role === "owner"
                          ? "rgba(245,158,11,0.15)" : "rgba(99,102,241,0.15)",
                        color: u.role === "admin" || u.role === "owner" ? "#F59E0B" : "#818CF8",
                      }}>
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    {u.subscription_tier || "free"}
                  </td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    {editUid === u.uid ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button onClick={() => handleRoleChange(u.uid)} style={actionBtn("#10B981")}>Save</button>
                        <button onClick={() => setEditUid(null)} style={actionBtn("#6B7280")}>Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditUid(u.uid); setEditRole(u.role); }} style={actionBtn("#6366F1")}>
                        Edit Role
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ padding: 32, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const actionBtn = (color: string): React.CSSProperties => ({
  padding: "4px 10px", borderRadius: 4, border: `1px solid ${color}33`,
  background: `${color}15`, color, fontSize: 11, fontWeight: 500, cursor: "pointer",
});
