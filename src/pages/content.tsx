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

const TABS = [
  { key: "meetings", label: "Replay Meetings", endpoint: "/admin/replay-meetings" },
  { key: "materials", label: "Seller Materials", endpoint: "/admin/seller-materials" },
  { key: "updates", label: "Amazon Updates", endpoint: "/admin/amazon-updates" },
];

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("meetings");

  useEffect(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    if (!tab) return;
    setLoading(true);
    apiGet(tab.endpoint)
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Content</h1>
        <p className="mt-1 text-[14px] text-gray-500">Manage platform content</p>
      </div>

      <div className="mb-6 flex gap-1 border-b border-gray-200">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px ${activeTab === t.key ? "border-indigo-600 text-indigo-700" : "border-transparent text-gray-400 hover:text-gray-600"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-[14px] text-gray-400">Loading content...</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Title", "Type", "Category", "Status", "Created"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id || item._id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50">
                  <td className="px-5 py-3 text-[13px] font-medium text-gray-900">{item.title}</td>
                  <td className="px-5 py-3 text-[12px] text-gray-500">{item.type || "—"}</td>
                  <td className="px-5 py-3 text-[12px] text-gray-500">{item.category || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${item.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {item.status || "draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[12px] text-gray-400">{item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="py-12 text-center text-[13px] text-gray-400">No content found</div>
          )}
        </div>
      )}
    </div>
  );
}
