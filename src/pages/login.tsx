import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, go to full Expo dashboard
  useEffect(() => {
    if (!authLoading && user) {
      document.cookie = "pa_auth=1; path=/; max-age=31536000";
      window.location.href = "/";
    }
  }, [authLoading, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) { setError("Please enter both email and password"); return; }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      document.cookie = "pa_auth=1; path=/; max-age=31536000";
      window.location.href = "/";
    } catch (err: any) {
      const code = err?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") setError("Invalid email or password");
      else if (code === "auth/too-many-requests") setError("Too many attempts. Please try again later.");
      else setError(err.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <LeftPanel />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-[28px] font-extrabold tracking-tight text-gray-900">Welcome back</h2>
            <p className="mt-2 text-[15px] text-gray-500">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0 text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
              <span className="text-[13px] text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="name@company.com"
                className="h-12 rounded-xl border border-gray-200 bg-gray-50/50 px-4 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-semibold text-gray-700">Password</label>
                <a href="#" className="text-[13px] font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 pr-12 text-[15px] text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                  {showPass ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="mt-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-[15px] font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Signing in...</>) : "Sign In"}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[12px] font-medium text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-center text-[14px] text-gray-500">
            New to Plug Akademi?{" "}
            <button onClick={() => setLocation("/signup")} className="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 lg:block">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative flex h-full flex-col justify-between p-14">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Plug Akademi" className="h-12 w-12 rounded-2xl object-contain" />
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight">Plug Akademi</div>
              <div className="text-[12px] font-medium text-white/50">Seller Academy</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-8">
            <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-tight text-white">Build your<br />Amazon FBA<br /><span className="text-white/70">empire</span></h1>
            <p className="max-w-[400px] text-[16px] leading-relaxed text-white/60">AI-powered tools, expert courses, and a thriving seller community.</p>
          </div>
        </div>
        <div className="text-[12px] text-white/30">&copy; 2026 Plug Akademi. All rights reserved.</div>
      </div>
    </div>
  );
}
