import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused]   = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      setLocation("/dashboard");
    }
  }, [authLoading, user, setLocation]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      setLocation("/dashboard");
    } catch (err: any) {
      const code = err?.code || "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A14", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div style={{
        width: "50%", minWidth: 0, position: "relative",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "56px", overflow: "hidden",
      }} className="left-panel">

        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Orbs */}
        <div style={{ position: "absolute", top: -150, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.1) 50%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -50, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "30%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 40, flex: 1, justifyContent: "center" }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 900, color: "#000",
              boxShadow: "0 8px 25px rgba(245,158,11,0.4)",
            }}>P</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
                Plug <span style={{ color: "#F59E0B" }}>Akademi</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Seller Academy</div>
            </div>
          </div>

          {/* Hero block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0 }}>
              Build your e-commerce<br />
              <span style={{ background: "linear-gradient(135deg, #F59E0B, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                empire with confidence
              </span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 460, margin: 0 }}>
              Join thousands of sellers mastering Amazon & Walmart with expert-led courses,
              AI-powered tools, and a thriving community.
            </p>
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { icon: "🛡️", label: "Verified Strategies" },
              { icon: "⚡", label: "AI-Powered Tools" },
              { icon: "👥", label: "2,500+ Sellers" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: 24, maxWidth: 480,
            display: "flex", flexDirection: "column", gap: 16,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>💬</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
              "Plug Akademi helped me scale from $0 to $15K/month on Amazon in just 4 months.
              The courses and community are incredible."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #F59E0B33, #6366F133)",
                border: "1px solid rgba(245,158,11,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#F59E0B",
              }}>JM</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Jean Marc</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Amazon FBA Seller</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ position: "relative", zIndex: 1, fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 32 }}>
          © 2026 Plug Akademi. All rights reserved.
        </div>
      </div>

      {/* ── RIGHT PANEL (Form) ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: "#0A0A14",
        padding: "48px 40px",
        position: "relative",
      }}>
        {/* Subtle orb */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

          {/* Form header */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>
              Welcome back
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 12, padding: "12px 16px", marginBottom: 24,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ color: "#EF4444", fontSize: 13, lineHeight: 1.5 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Email</label>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: emailFocused ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${emailFocused ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12, padding: "0 16px", height: 50,
                transition: "all 0.2s",
                boxShadow: emailFocused ? "0 0 0 3px rgba(245,158,11,0.1)" : "none",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>✉️</span>
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="name@company.com"
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontSize: 15, color: "#fff", fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Password</label>
                <a href="#" style={{ fontSize: 13, color: "#F59E0B", textDecoration: "none", fontWeight: 500 }}>
                  Forgot password?
                </a>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: passFocused ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${passFocused ? "rgba(245,158,11,0.5)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12, padding: "0 16px", height: 50,
                transition: "all 0.2s",
                boxShadow: passFocused ? "0 0 0 3px rgba(245,158,11,0.1)" : "none",
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>🔒</span>
                <input
                  type={showPass ? "text" : "password"} value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  placeholder="Enter your password"
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontSize: 15, color: "#fff", fontFamily: "inherit",
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.4)", fontSize: 16, padding: 4,
                }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: "100%", height: 50, borderRadius: 12, border: "none", cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "rgba(245,158,11,0.5)" : "linear-gradient(135deg, #F59E0B, #D97706)",
              color: "#000", fontSize: 15, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "inherit",
              boxShadow: loading ? "none" : "0 4px 20px rgba(245,158,11,0.4)",
              transition: "all 0.3s",
            }}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#000", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Signing in...
                </span>
              ) : (
                <> Sign In &nbsp; → </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Sign up link */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>New to Plug Akademi? </span>
            <a href="#" style={{ fontSize: 14, color: "#F59E0B", fontWeight: 600, textDecoration: "none" }}>
              Create an account
            </a>
          </div>

          {/* Security footer */}
          <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>🛡️</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>Protected by enterprise-grade security</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
        @media (max-width: 768px) {
          .left-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
