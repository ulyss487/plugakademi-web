import { useEffect, useState } from "react";
import { apiGet, apiPut } from "@/lib/api";

interface Settings {
  maintenance_mode?: boolean;
  registration_open?: boolean;
  max_free_ai_uses?: number;
  community_enabled?: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiGet("/admin/settings").then(setSettings).catch(() => setSettings({})).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    try { await apiPut("/admin/settings", settings); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="py-8 text-[14px] text-gray-400">Loading settings...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-[14px] text-gray-500">Platform configuration</p>
      </div>

      <div className="max-w-[600px] space-y-1 rounded-2xl border border-gray-200 bg-white p-6">
        <SettingToggle
          label="Maintenance Mode" desc="Take the platform offline for maintenance"
          value={!!settings.maintenance_mode}
          onChange={(v) => setSettings({ ...settings, maintenance_mode: v })}
        />
        <SettingToggle
          label="Registration Open" desc="Allow new users to register"
          value={settings.registration_open === true}
          onChange={(v) => setSettings({ ...settings, registration_open: v })}
        />
        <SettingToggle
          label="Community Enabled" desc="Enable/disable the community feed"
          value={settings.community_enabled === true}
          onChange={(v) => setSettings({ ...settings, community_enabled: v })}
        />

        <div className="flex items-center justify-between border-b border-gray-100 py-5">
          <div>
            <div className="text-[14px] font-semibold text-gray-900">Max Free AI Uses</div>
            <div className="mt-0.5 text-[12px] text-gray-400">Daily limit for free tier AI tool usage</div>
          </div>
          <input
            type="number" value={settings.max_free_ai_uses ?? 5} min={0} max={100}
            onChange={(e) => setSettings({ ...settings, max_free_ai_uses: parseInt(e.target.value) || 0 })}
            className="h-10 w-20 rounded-lg border border-gray-200 bg-gray-50/50 px-3 text-center text-[14px] text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button onClick={handleSave} disabled={saving} className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50">
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-[13px] font-medium text-emerald-600">Settings saved!</span>}
        </div>
      </div>
    </div>
  );
}

function SettingToggle({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-5">
      <div>
        <div className="text-[14px] font-semibold text-gray-900">{label}</div>
        <div className="mt-0.5 text-[12px] text-gray-400">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? "bg-indigo-600" : "bg-gray-200"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${value ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
