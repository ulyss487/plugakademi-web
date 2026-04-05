import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import OtpVerification from "@/components/OtpVerification";

const API_URL = "https://api.plugakademi.org";
const COUNTRIES = [
  { label: "United States", value: "US", code: "+1" },
  { label: "Canada", value: "CA", code: "+1" },
];

function formatPhoneInput(text: string): string {
  if (!text.startsWith("+1")) text = "+1" + text.replace(/^\+?1?/, "");
  const digits = text.slice(2).replace(/\D/g, "");
  if (digits.length === 0) return "+1";
  if (digits.length <= 3) return `+1 (${digits}`;
  if (digits.length <= 6) return `+1 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function getRawPhone(formatted: string): string {
  return "+" + formatted.replace(/\D/g, "");
}

export default function SignupPage() {
  const { signup, user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ displayName: "", email: "", phone: "+1", password: "", confirmPassword: "", country: "" });
  const [showPass, setShowPass] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralStatus, setReferralStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [referralName, setReferralName] = useState("");
  const [referralError, setReferralError] = useState("");
  const referralTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [step, setStep] = useState<"form" | "verify" | "success">("form");

  useEffect(() => {
    if (!authLoading && user && step !== "success") setStep("success");
  }, [authLoading, user, step]);

  const setField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!form.displayName.trim()) e.displayName = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    const raw = getRawPhone(form.phone);
    const digits = raw.replace(/\D/g, "");
    if (digits.length !== 11) e.phone = "Phone must be 10 digits after +1";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    if (!form.country) e.country = "Select your country";
    if (!acceptedTerms) e.terms = "You must accept the Terms & Conditions";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setStep("verify");
  };

  const handlePhoneVerified = async () => {
    setLoading(true);
    try {
      const rawPhone = getRawPhone(form.phone);
      await signup(form.email.trim(), form.password, form.displayName.trim(), rawPhone, form.country);
      if (referralCode && referralStatus === "valid") {
        try {
          await fetch(`${API_URL}/api/referral/track-signup`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referral_code: referralCode }),
          });
        } catch {}
      }
      setStep("success");
    } catch (err: any) {
      setStep("form");
      const msg = err.code === "auth/email-already-in-use" ? "This email is already in use."
        : err.code === "auth/weak-password" ? "Password is too weak."
        : err.code === "auth/invalid-email" ? "Invalid email address."
        : err.message || "Registration failed.";
      window.alert(msg);
      if (err.code === "auth/email-already-in-use") setErrors({ email: msg });
      else if (err.code === "auth/weak-password") setErrors({ password: msg });
      else if (msg.toLowerCase().includes("phone")) setErrors({ phone: msg });
    } finally { setLoading(false); }
  };

  const handleReferralChange = (text: string) => {
    const clean = text.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    setReferralCode(clean);
    setReferralName("");
    setReferralError("");
    if (referralTimer.current) clearTimeout(referralTimer.current);
    if (!clean) { setReferralStatus("idle"); return; }
    if (clean.length < 4) { setReferralStatus("invalid"); setReferralError("Must be at least 4 characters"); return; }
    setReferralStatus("checking");
    referralTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/api/referral/validate/${clean}`);
        const data = await res.json();
        if (data.valid) { setReferralStatus("valid"); setReferralName(data.referrer_name || clean); }
        else { setReferralStatus("invalid"); setReferralError(data.error || "Invalid referral code"); }
      } catch { setReferralStatus("invalid"); setReferralError("Could not verify"); }
    }, 600);
  };

  const inputCls = "h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20";
  const errCls = "text-[12px] text-red-500 mt-1";

  if (step === "success") {
    return (
      <div className="flex min-h-screen bg-white">
        <LeftPanel />
        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 lg:px-8">
          <div className="w-full max-w-[420px] text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h2 className="text-[28px] font-extrabold tracking-tight text-gray-900">Account Created!</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-gray-500">
              Your Plug Akademi account is ready. Download our app to access all tools, courses, and community features.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://apps.apple.com/app/plug-akademi/id6742820338"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gray-900 px-8 text-[15px] font-bold text-white transition-all hover:bg-gray-800"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download on the App Store
              </a>
              <button
                onClick={() => setLocation("/")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 text-[14px] font-medium text-gray-600 transition-all hover:bg-gray-50"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <LeftPanel />
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10 lg:px-8">
        <div className="w-full max-w-[420px]">
          {step === "verify" ? (
            <OtpVerification phone={getRawPhone(form.phone)} onVerified={handlePhoneVerified} onBack={() => setStep("form")} />
          ) : (
            <>
              <button onClick={() => setLocation("/")} className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                Back to home
              </button>
              <div className="mb-6">
                <h2 className="text-[26px] font-bold tracking-tight text-gray-900">Create your account</h2>
                <p className="mt-1 text-[15px] text-gray-500">Fill in your details to get started</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Field label="Full Name" error={errors.displayName}>
                  <input type="text" value={form.displayName} onChange={(e) => setField("displayName", e.target.value)} placeholder="John Doe" className={inputCls} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="name@company.com" className={inputCls} />
                </Field>
                <Field label="Phone Number" error={errors.phone} hint="US or Canada number only (+1)">
                  <input type="tel" value={form.phone} onChange={(e) => { setForm((f) => ({ ...f, phone: formatPhoneInput(e.target.value) })); setErrors((er) => ({ ...er, phone: "" })); }} placeholder="+1 (555) 123-4567" maxLength={17} className={inputCls} />
                </Field>
                <Field label="Country" error={errors.country} hint="Only USA and Canada residents can register">
                  <div className="relative">
                    <button type="button" onClick={() => setShowCountry(!showCountry)}
                      className={`${inputCls} flex items-center justify-between text-left ${!form.country ? "text-gray-400" : ""}`}>
                      <span>{form.country ? COUNTRIES.find((c) => c.value === form.country)?.label : "Select your country"}</span>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </button>
                    {showCountry && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
                        {COUNTRIES.map((c) => (
                          <button key={c.value} type="button" onClick={() => { setField("country", c.value); setShowCountry(false); }}
                            className={`flex w-full items-center justify-between px-4 py-3 text-[14px] hover:bg-gray-50 ${form.country === c.value ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-700"}`}>
                            {c.label}
                            {form.country === c.value && <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
                <Field label="Password" error={errors.password}>
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setField("password", e.target.value)} placeholder="Minimum 8 characters" className={`${inputCls} pr-12`} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>{showPass ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /> : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></>}</svg>
                    </button>
                  </div>
                </Field>
                <Field label="Confirm Password" error={errors.confirmPassword}>
                  <input type="password" value={form.confirmPassword} onChange={(e) => setField("confirmPassword", e.target.value)} placeholder="Re-enter your password" className={inputCls} />
                </Field>
                <Field label={<>Referral Code <span className="text-gray-400 font-normal text-[12px]">(Optional)</span></>} hint="Enter the username of who referred you">
                  <div className="relative">
                    <input type="text" value={referralCode} onChange={(e) => handleReferralChange(e.target.value)} placeholder="Enter referrer's username" className={`${inputCls} pr-10`} />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {referralStatus === "checking" && <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 inline-block" />}
                      {referralStatus === "valid" && <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
                      {referralStatus === "invalid" && referralCode.length > 0 && <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
                    </div>
                  </div>
                  {referralStatus === "valid" && <p className="text-[12px] text-green-600 mt-1">Referred by {referralName}</p>}
                  {referralStatus === "invalid" && referralCode.length > 0 && <p className={errCls}>{referralError}</p>}
                </Field>
                <div className="mt-1">
                  <div className="flex items-start gap-2.5">
                    <button type="button" onClick={() => { setAcceptedTerms(!acceptedTerms); setErrors((e) => ({ ...e, terms: "" })); }} className="mt-0.5 shrink-0">
                      {acceptedTerms ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4F46E5"><rect width="20" height="20" x="2" y="2" rx="4" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="4" /></svg>
                      )}
                    </button>
                    <p className="text-[13px] text-gray-500 leading-5">
                      I agree to the <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-700">Terms & Conditions</a> and <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-700">Privacy Policy</a>
                    </p>
                  </div>
                  {errors.terms && <p className={`${errCls} ml-8`}>{errors.terms}</p>}
                </div>
                <button type="submit" disabled={loading}
                  className="mt-2 flex h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-[15px] font-bold text-white shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Creating...</>) : (<>Create Account <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg></>)}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, hint, children }: { label: React.ReactNode; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-semibold text-gray-700">{label}</label>
      {children}
      {error && <p className="text-[12px] text-red-500">{error}</p>}
      {hint && !error && <p className="text-[12px] text-gray-400">{hint}</p>}
    </div>
  );
}

function LeftPanel() {
  const BENEFITS = [
    { title: "Expert-Led Courses", desc: "Step-by-step A-Z training from 6-figure sellers", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg> },
    { title: "AI-Powered Tools", desc: "Smart product research and profit analysis", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg> },
    { title: "Community Access", desc: "Connect with 2,500+ active sellers", icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg> },
  ];
  return (
    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 lg:block">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative flex h-full flex-col justify-between p-14">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Plug Akademi" className="h-12 w-12 rounded-2xl object-contain" />
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight">Plug Akademi</div>
              <div className="text-[12px] font-medium text-white/50">Seller Academy</div>
            </div>
          </div>
          <div className="mt-4">
            <h1 className="text-[38px] font-extrabold leading-[1.15] tracking-tight text-white">
              Start your seller<br />journey today
            </h1>
            <p className="mt-4 max-w-[440px] text-[16px] leading-relaxed text-white/55">
              Join a community of ambitious entrepreneurs building profitable e-commerce businesses on Amazon & Walmart.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-200">{b.icon}</div>
                <div>
                  <div className="text-[15px] font-bold text-white">{b.title}</div>
                  <div className="text-[13px] leading-snug text-white/45">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[12px] text-white/30">&copy; 2026 Plug Akademi. All rights reserved.</div>
      </div>
    </div>
  );
}
