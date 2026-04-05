import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";

interface UserRecord {
  uid: string;
  email: string;
  name?: string;
  role: string;
  subscription_tier?: string;
  created_at?: string;
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
    try { await apiPut(`/admin/users/${uid}/role`, { role: editRole }); setEditUid(null); fetchUsers(); }
    catch (e: any) { alert(e.message); }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.email?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q);
  });

  const roleBadge = (role: string) => {
    const isAdmin = role === "admin" || role === "owner";
    return (
      <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${isAdmin ? "bg-indigo-50 text-indigo-700" : "bg-gray-100 text-gray-600"}`}>
        {role}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Users</h1>
          <p className="mt-1 text-[14px] text-gray-500">{users.length} registered users</p>
        </div>
        <input
          type="text" placeholder="Search users..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-[260px] rounded-xl border border-gray-200 bg-white px-4 text-[13px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {loading ? (
        <div className="text-[14px] text-gray-400">Loading users...</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Email", "Name", "Role", "Tier", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.uid} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-[13px] font-medium text-gray-900">{u.email}</td>
                  <td className="px-5 py-3 text-[13px] text-gray-500">{u.name || "—"}</td>
                  <td className="px-5 py-3">
                    {editUid === u.uid ? (
                      <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[12px] text-gray-700 outline-none focus:border-indigo-500">
                        {["free", "basic", "premium", "admin", "owner"].map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    ) : roleBadge(u.role)}
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-400">{u.subscription_tier || "free"}</td>
                  <td className="px-5 py-3 text-[12px] text-gray-400">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3">
                    {editUid === u.uid ? (
                      <div className="flex gap-2">
                        <button onClick={() => handleRoleChange(u.uid)} className="rounded-md bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100">Save</button>
                        <button onClick={() => setEditUid(null)} className="rounded-md bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-200">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => { setEditUid(u.uid); setEditRole(u.role); }} className="rounded-md bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100">Edit Role</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-[13px] text-gray-400">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
