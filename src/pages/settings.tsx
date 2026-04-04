import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";

interface Settings {
  maintenance_mode?: boolean;
  registration_open?: boolean;
  max_free_ai_uses?: number;
  community_enabled?: boolean;
  default_language?: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiGet("/admin/settings")
      .then(setSettings)
      .catch(() => setSettings({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await apiPut("/admin/settings", settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleStyle = (on: boolean): React.CSSProperties => ({
    width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
    background: on ? "#10B981" : "rgba(255,255,255,0.15)",
    position: "relative", transition: "background 0.2s",
  });

  const dotStyle = (on: boolean): React.CSSProperties => ({
    width: 18, height: 18, borderRadius: "50%", background: "#fff",
    position: "absolute", top: 3, left: on ? 22 : 4, transition: "left 0.2s",
  });

  if (loading) return <div style={{ color: "rgba(255,255,255,0.4)", padding: 32 }}>Loading settings...</div>;

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>Settings</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
          Platform configuration
        </p>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 24,
        maxWidth: 600,
      }}>
        <SettingRow label="Maintenance Mode" desc="Take the platform offline for maintenance">
          <button style={toggleStyle(!!settings.maintenance_mode)}
            onClick={() => setSettings({ ...settings, maintenance_mode: !settings.maintenance_mode })}>
            <div style={dotStyle(!!settings.maintenance_mode)} />
          </button>
        </SettingRow>

        <SettingRow label="Registration Open" desc="Allow new users to register">
          <button style={toggleStyle(settings.registration_open === true)}
            onClick={() => setSettings({ ...settings, registration_open: !(settings.registration_open === true) })}>
            <div style={dotStyle(settings.registration_open === true)} />
          </button>
        </SettingRow>

        <SettingRow label="Community Enabled" desc="Enable/disable the community feed">
          <button style={toggleStyle(settings.community_enabled === true)}
            onClick={() => setSettings({ ...settings, community_enabled: !(settings.community_enabled === true) })}>
            <div style={dotStyle(settings.community_enabled === true)} />
          </button>
        </SettingRow>

        <SettingRow label="Max Free AI Uses" desc="Daily limit for free tier AI tool usage">
          <input
            type="number" value={settings.max_free_ai_uses ?? 5} min={0} max={100}
            onChange={(e) => setSettings({ ...settings, max_free_ai_uses: parseInt(e.target.value) || 0 })}
            style={{
              width: 80, padding: "6px 10px", borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
              color: "#fff", fontSize: 13, textAlign: "center",
            }}
          />
        </SettingRow>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
          <button onClick={handleSave} disabled={saving} style={{
            padding: "10px 24px", borderRadius: 8, border: "none",
            background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#000",
            fontSize: 14, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
          }}>
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span style={{ color: "#10B981", fontSize: 13 }}>Settings saved!</span>}
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{label}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{desc}</div>
      </div>
      {children}
    </div>
  );
}
