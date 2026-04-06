import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

interface ContentItem {
  id?: string;
  _id?: string;
  title: string;
  type?: string;
  category?: string;
  created_at?: string;
  status?: string;
  product_image?: string;
  url?: string;
  description?: string;
  required_plan?: string;
  replay_link?: string;
  host?: string;
  meeting_date?: string;
  tag?: string;
  summary?: string;
  banner_image?: string;
}

const TABS = [
  { key: "materials", label: "Seller Materials", endpoint: "/admin/content/materials" },
  { key: "meetings", label: "Replay Meetings", endpoint: "/admin/content/replay-meetings" },
  { key: "updates", label: "Amazon Updates", endpoint: "/admin/content/amazon-updates" },
];

const PLAN_OPTIONS = ["free", "paid", "vip"];
const STATUS_OPTIONS = ["published", "draft"];

const MATERIAL_CATEGORIES = ["other", "labels", "ht_links", "templates", "supplier_links"];
const MEETING_CATEGORIES = ["tuesday", "friday", "special", "coaching"];
const UPDATE_TAGS = ["general", "policy", "shipping", "fees", "ungating"];

function planBadge(plan?: string) {
  const p = (plan || "free").toLowerCase();
  const cls =
    p === "vip" ? "bg-amber-50 text-amber-700" :
    p === "paid" ? "bg-blue-50 text-blue-700" :
    "bg-emerald-50 text-emerald-700";
  return <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${cls}`}>{p.toUpperCase()}</span>;
}

function statusBadge(status?: string) {
  const s = status || "draft";
  const cls = s === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700";
  return <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${cls}`}>{s}</span>;
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<ContentItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const tab = TABS.find((t) => t.key === activeTab)!;

  const fetchItems = () => {
    setLoading(true);
    apiGet(tab.endpoint)
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, [activeTab]);

  const openAdd = () => {
    setEditItem(getDefaultItem());
    setShowModal(true);
  };

  const openEdit = (item: ContentItem) => {
    setEditItem({ ...item });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditItem(null); };

  const getDefaultItem = (): ContentItem => {
    if (activeTab === "materials") return { title: "", category: "other", type: "link", url: "", product_image: "", description: "", required_plan: "free", status: "published" };
    if (activeTab === "meetings") return { title: "", category: "tuesday", replay_link: "", host: "", meeting_date: "", description: "", required_plan: "free", status: "published" };
    return { title: "", tag: "general", summary: "", banner_image: "", required_plan: "free", status: "published" };
  };

  const handleSave = async () => {
    if (!editItem || !editItem.title.trim()) return;
    setSaving(true);
    try {
      const id = editItem.id || editItem._id;
      if (id) {
        await apiPut(`${tab.endpoint}/${id}`, editItem);
      } else {
        await apiPost(tab.endpoint, editItem);
      }
      closeModal();
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error saving item");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    setDeleteId(id);
    try {
      await apiDelete(`${tab.endpoint}/${id}`);
      fetchItems();
    } catch (e: any) {
      alert(e.message || "Error deleting item");
    } finally {
      setDeleteId(null);
    }
  };

  const set = (key: string, val: string) => setEditItem((prev) => prev ? { ...prev, [key]: val } : prev);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Content</h1>
          <p className="mt-1 text-[14px] text-gray-500">Manage platform content</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-[13px] font-semibold text-white shadow hover:bg-indigo-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add New
        </button>
      </div>

      <div className="mb-6 flex gap-1 border-b border-gray-200">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px ${activeTab === t.key ? "border-indigo-600 text-indigo-700" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >{t.label}</button>
        ))}
      </div>

      {loading ? (
        <div className="text-[14px] text-gray-400 py-8 text-center">Loading...</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <svg className="mx-auto h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <p className="mt-3 text-[14px] text-gray-400">No items yet</p>
          <button onClick={openAdd} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-indigo-700">Add First Item</button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {activeTab === "materials" ? (
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              {items.map((item) => {
                const id = item.id || item._id!;
                return (
                  <div key={id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                    {/* Image preview */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center">
                      {item.product_image ? (
                        <img src={item.product_image} alt={item.title} className="h-full w-full object-contain" />
                      ) : (
                        <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 truncate">{item.title}</p>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        {planBadge(item.required_plan)}
                        {statusBadge(item.status)}
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-500 hover:underline truncate max-w-[180px]">
                            {item.url}
                          </a>
                        )}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => openEdit(item)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={deleteId === id}
                        className="rounded-lg border border-red-100 px-3 py-1.5 text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deleteId === id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {["Title", "Category/Tag", "Plan", "Status", "Created", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const id = item.id || item._id!;
                  return (
                    <tr key={id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                      <td className="px-5 py-3 text-[13px] font-medium text-gray-900 max-w-[220px] truncate">{item.title}</td>
                      <td className="px-5 py-3 text-[12px] text-gray-500">{item.category || item.tag || "—"}</td>
                      <td className="px-5 py-3">{planBadge(item.required_plan)}</td>
                      <td className="px-5 py-3">{statusBadge(item.status)}</td>
                      <td className="px-5 py-3 text-[12px] text-gray-400">{item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(item)} className="rounded-lg border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-600 hover:bg-gray-50">Edit</button>
                          <button onClick={() => handleDelete(id)} disabled={deleteId === id} className="rounded-lg border border-red-100 px-3 py-1 text-[12px] font-medium text-red-500 hover:bg-red-50 disabled:opacity-50">
                            {deleteId === id ? "..." : "Del"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-[15px] font-bold text-gray-900">
                {editItem.id || editItem._id ? "Edit Item" : "Add New Item"}
              </h2>
              <button onClick={closeModal} className="rounded-full p-1 text-gray-400 hover:text-gray-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1">Title *</label>
                <input
                  type="text"
                  value={editItem.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Product or content title"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none"
                />
              </div>

              {/* Tab-specific fields */}
              {activeTab === "materials" && (
                <>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Product Image URL</label>
                    <input
                      type="text"
                      value={editItem.product_image || ""}
                      onChange={(e) => set("product_image", e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none"
                    />
                    {editItem.product_image && (
                      <img src={editItem.product_image} alt="preview" className="mt-2 h-20 w-20 rounded-lg object-contain border border-gray-100 bg-gray-50" />
                    )}
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Buy Link (Amazon URL)</label>
                    <input
                      type="text"
                      value={editItem.url || ""}
                      onChange={(e) => set("url", e.target.value)}
                      placeholder="https://amzn.to/..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Category</label>
                    <select value={editItem.category || "other"} onChange={(e) => set("category", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none">
                      {MATERIAL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              )}

              {activeTab === "meetings" && (
                <>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Replay Link</label>
                    <input type="text" value={editItem.replay_link || ""} onChange={(e) => set("replay_link", e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Host</label>
                    <input type="text" value={editItem.host || ""} onChange={(e) => set("host", e.target.value)} placeholder="Host name" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Meeting Date</label>
                    <input type="date" value={editItem.meeting_date || ""} onChange={(e) => set("meeting_date", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Category</label>
                    <select value={editItem.category || "tuesday"} onChange={(e) => set("category", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none">
                      {MEETING_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </>
              )}

              {activeTab === "updates" && (
                <>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Summary</label>
                    <textarea value={editItem.summary || ""} onChange={(e) => set("summary", e.target.value)} rows={3} placeholder="Short summary..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none resize-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Tag</label>
                    <select value={editItem.tag || "general"} onChange={(e) => set("tag", e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none">
                      {UPDATE_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-500 mb-1">Banner Image URL</label>
                    <input type="text" value={editItem.banner_image || ""} onChange={(e) => set("banner_image", e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] focus:border-indigo-400 focus:outline-none" />
                  </div>
                </>
              )}

              {/* Description (shared) */}
              {activeTab !== "updates" && (
                <div>
                  <label className="block text-[12px] font-semibold text-gray-500 mb-1">Description</label>
                  <textarea
                    value={editItem.description || ""}
                    onChange={(e) => set("description", e.target.value)}
                    rows={2}
                    placeholder="Optional description"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none resize-none"
                  />
                </div>
              )}

              {/* Plan & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-500 mb-1">Required Plan</label>
                  <select value={editItem.required_plan || "free"} onChange={(e) => set("required_plan", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none">
                    {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-500 mb-1">Status</label>
                  <select value={editItem.status || "published"} onChange={(e) => set("status", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-900 focus:border-indigo-400 focus:outline-none">
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button onClick={closeModal} className="rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button
                onClick={handleSave}
                disabled={saving || !editItem.title.trim()}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
