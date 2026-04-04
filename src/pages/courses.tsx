import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "@/lib/api";

interface Course {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  status?: string;
  modules_count?: number;
  enrolled_count?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [saving, setSaving] = useState(false);

  const fetchCourses = () => {
    setLoading(true);
    apiGet("/lms/courses")
      .then((data) => setCourses(Array.isArray(data) ? data : data.courses || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    try { await apiPost("/admin/courses", { title, description, category }); setTitle(""); setDescription(""); setCategory("general"); setShowForm(false); fetchCourses(); }
    catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try { await apiDelete(`/admin/courses/${id}`); fetchCourses(); }
    catch (e: any) { alert(e.message); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Courses</h1>
          <p className="mt-1 text-[14px] text-gray-500">{courses.length} courses</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:shadow-md transition-all">
          {showForm ? "Cancel" : "+ New Course"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course title" className="h-10 rounded-lg border border-gray-200 bg-gray-50/50 px-4 text-[14px] text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Course description" rows={3} className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 text-[14px] text-gray-900 outline-none resize-y placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 rounded-lg border border-gray-200 bg-white px-4 text-[14px] text-gray-700 outline-none focus:border-indigo-500">
            {["general", "fba", "fbm", "wholesale", "private-label", "arbitrage"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleCreate} disabled={saving} className="self-start rounded-lg bg-emerald-600 px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
            {saving ? "Creating..." : "Create Course"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-[14px] text-gray-400">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((c) => {
            const id = c.id || c._id || "";
            return (
              <div key={id} className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md">
                <div className="flex items-start justify-between">
                  <h3 className="text-[16px] font-bold text-gray-900">{c.title}</h3>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${c.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {c.status || "draft"}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-gray-500">{c.description || "No description"}</p>
                <div className="flex gap-4 text-[12px] text-gray-400">
                  <span className="flex items-center gap-1"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg> {c.category || "general"}</span>
                  <span>{c.modules_count ?? 0} modules</span>
                  <span>{c.enrolled_count ?? 0} enrolled</span>
                </div>
                <button onClick={() => handleDelete(id)} className="mt-2 self-start rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-100">Delete</button>
              </div>
            );
          })}
          {courses.length === 0 && (
            <div className="col-span-full py-12 text-center text-[13px] text-gray-400">No courses yet. Create your first course above.</div>
          )}
        </div>
      )}
    </div>
  );
}
