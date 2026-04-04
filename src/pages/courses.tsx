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
    try {
      await apiPost("/admin/courses", { title, description, category });
      setTitle(""); setDescription(""); setCategory("general"); setShowForm(false);
      fetchCourses();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      await apiDelete(`/admin/courses/${id}`);
      fetchCourses();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Courses</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
            {courses.length} courses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#000",
            fontSize: 13, fontWeight: 600,
          }}
        >
          {showForm ? "Cancel" : "+ New Course"}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: 20, marginBottom: 20, display: "flex", flexDirection: "column", gap: 12,
        }}>
          <input
            value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title" style={inputStyle}
          />
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description" rows={3}
            style={{ ...inputStyle, resize: "vertical", height: "auto", padding: "10px 14px" }}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
            {["general", "fba", "fbm", "wholesale", "private-label", "arbitrage"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={handleCreate} disabled={saving} style={{
            padding: "10px 20px", borderRadius: 8, border: "none",
            background: "#10B981", color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer", alignSelf: "flex-start",
          }}>
            {saving ? "Creating..." : "Create Course"}
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Loading courses...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {courses.map((c) => {
            const id = c.id || c._id || "";
            return (
              <div key={id} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 10,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 }}>{c.title}</h3>
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 4,
                    background: c.status === "published" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)",
                    color: c.status === "published" ? "#10B981" : "#F59E0B",
                  }}>
                    {c.status || "draft"}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>
                  {c.description || "No description"}
                </p>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                  <span>📂 {c.category || "general"}</span>
                  <span>📖 {c.modules_count ?? 0} modules</span>
                  <span>👤 {c.enrolled_count ?? 0} enrolled</span>
                </div>
                <button onClick={() => handleDelete(id)} style={{
                  padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.08)", color: "#EF4444", fontSize: 11,
                  cursor: "pointer", alignSelf: "flex-start", marginTop: 4,
                }}>
                  Delete
                </button>
              </div>
            );
          })}
          {courses.length === 0 && (
            <div style={{ padding: 32, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              No courses yet. Create your first course above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 13,
};
