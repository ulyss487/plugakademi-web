import { useLocation } from "wouter";

const features = [
  {
    icon: "📦",
    title: "Product Leads",
    desc: "Curated profitable products delivered to your dashboard weekly — sourced and verified by our expert team.",
  },
  {
    icon: "🤖",
    title: "AI Business Assistant",
    desc: "PlugGPT — your personal AI assistant trained on Amazon selling strategies, fluent in Haitian Creole.",
  },
  {
    icon: "🎓",
    title: "Video Courses",
    desc: "Step-by-step courses covering everything from product sourcing to scaling your Amazon FBA business.",
  },
  {
    icon: "📊",
    title: "Analytics & Tools",
    desc: "Track your progress, estimate profits, and make data-driven decisions with our built-in tools.",
  },
  {
    icon: "💬",
    title: "Community Support",
    desc: "Join a thriving community of Haitian Amazon sellers sharing tips, wins, and motivation.",
  },
  {
    icon: "📧",
    title: "Marketing Suite",
    desc: "Built-in email marketing tools to help you grow your audience and engage your customers.",
  },
];

const plans = [
  { name: "Free", price: "$0", period: "/month", items: ["5 AI questions/day", "Limited course access", "Community access"], cta: "Get Started" },
  { name: "Pro", price: "$29", period: "/month", items: ["Unlimited AI questions", "All courses", "Weekly product leads", "Priority support"], cta: "Start Pro", highlight: true },
  { name: "Elite", price: "$59", period: "/month", items: ["Everything in Pro", "1-on-1 coaching", "Exclusive leads", "Early access features"], cta: "Go Elite" },
];

export default function LandingPage() {
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "#0A0A14", color: "#fff", minHeight: "100vh" }}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={{ fontSize: 28 }}>⚡</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#F59E0B" }}>Plug Akademi</span>
        </div>
        <button onClick={() => navigate("/login")} style={styles.loginBtn}>
          Sign In
        </button>
      </header>

      <section style={styles.hero}>
        <div style={styles.badge}>🇭🇹 Built for Haitian Amazon Sellers</div>
        <h1 style={styles.heroTitle}>
          Your Path to Amazon
          <span style={{ color: "#F59E0B" }}> FBA Success</span>
        </h1>
        <p style={styles.heroSub}>
          Plug Akademi gives you the tools, education, and AI-powered guidance
          to build a profitable Amazon FBA business — all in one platform.
        </p>
        <div style={styles.heroBtns}>
          <button onClick={() => navigate("/login")} style={styles.ctaPrimary}>
            Get Started Free →
          </button>
          <a href="#features" style={styles.ctaSecondary}>
            Learn More ↓
          </a>
        </div>
        <div style={styles.stats}>
          {[["500+", "Active Sellers"], ["10K+", "Products Sourced"], ["50+", "Video Lessons"]].map(([n, l]) => (
            <div key={l} style={styles.stat}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#F59E0B" }}>{n}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" style={styles.section}>
        <h2 style={styles.sectionTitle}>Everything You Need to Succeed</h2>
        <p style={styles.sectionSub}>
          From finding profitable products to managing your business, we've got you covered.
        </p>
        <div style={styles.grid}>
          {features.map((f) => (
            <div key={f.title} style={styles.card}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ ...styles.section, background: "rgba(245,158,11,0.03)" }}>
        <h2 style={styles.sectionTitle}>Simple, Transparent Pricing</h2>
        <p style={styles.sectionSub}>Start free. Upgrade when you're ready to scale.</p>
        <div style={styles.planGrid}>
          {plans.map((p) => (
            <div key={p.name} style={{ ...styles.planCard, ...(p.highlight ? styles.planHighlight : {}) }}>
              {p.highlight && <div style={styles.popular}>Most Popular</div>}
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: "#F59E0B" }}>{p.price}</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {p.items.map((item) => (
                  <li key={item} style={styles.planItem}>
                    <span style={{ color: "#22C55E", marginRight: 8 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/login")}
                style={p.highlight ? styles.ctaPrimary : styles.planBtn}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.ctaBox}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Ready to Start Selling on Amazon?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24, maxWidth: 500 }}>
            Join hundreds of Haitian entrepreneurs building successful Amazon businesses with Plug Akademi.
          </p>
          <button onClick={() => navigate("/login")} style={styles.ctaPrimary}>
            Create Free Account →
          </button>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.logo}>
          <span style={{ fontSize: 20 }}>⚡</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#F59E0B" }}>Plug Akademi</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          © {new Date().getFullYear()} Plug Akademi. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          <a href="mailto:hello@plugakademi.com" style={{ color: "inherit" }}>Contact</a>
          <span>Terms</span>
          <span>Privacy</span>
        </div>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)",
    position: "sticky", top: 0, background: "rgba(10,10,20,0.95)",
    backdropFilter: "blur(12px)", zIndex: 100,
  },
  logo: { display: "flex", alignItems: "center", gap: 8 },
  loginBtn: {
    padding: "8px 20px", borderRadius: 8, border: "1px solid rgba(245,158,11,0.4)",
    background: "transparent", color: "#F59E0B", fontSize: 13,
    fontWeight: 600, cursor: "pointer",
  },
  hero: {
    textAlign: "center", padding: "80px 24px 60px", maxWidth: 700, margin: "0 auto",
  },
  badge: {
    display: "inline-block", padding: "6px 16px", borderRadius: 20,
    background: "rgba(245,158,11,0.1)", color: "#F59E0B",
    fontSize: 13, fontWeight: 600, marginBottom: 24,
  },
  heroTitle: { fontSize: 44, fontWeight: 900, lineHeight: 1.15, marginBottom: 20 },
  heroSub: {
    fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7,
    maxWidth: 540, margin: "0 auto 32px",
  },
  heroBtns: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" as const },
  ctaPrimary: {
    padding: "12px 28px", borderRadius: 10, border: "none",
    background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#000",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
  },
  ctaSecondary: {
    padding: "12px 28px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)", background: "transparent",
    color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer",
    textDecoration: "none",
  },
  stats: {
    display: "flex", justifyContent: "center", gap: 48, marginTop: 48,
    flexWrap: "wrap" as const,
  },
  stat: { textAlign: "center" },
  section: { padding: "64px 24px", maxWidth: 1000, margin: "0 auto" },
  sectionTitle: {
    fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 12,
  },
  sectionSub: {
    fontSize: 15, color: "rgba(255,255,255,0.5)", textAlign: "center",
    marginBottom: 40, maxWidth: 500, margin: "0 auto 40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    padding: 24, borderRadius: 12,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
  },
  planGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20, maxWidth: 900, margin: "0 auto",
  },
  planCard: {
    padding: 28, borderRadius: 14, background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)", textAlign: "center",
    position: "relative" as const,
  },
  planHighlight: {
    border: "2px solid #F59E0B", background: "rgba(245,158,11,0.05)",
  },
  popular: {
    position: "absolute" as const, top: -12, left: "50%",
    transform: "translateX(-50%)", background: "#F59E0B", color: "#000",
    fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 10,
  },
  planItem: {
    fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 10,
    textAlign: "left" as const,
  },
  planBtn: {
    padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent", color: "#fff", fontSize: 14,
    fontWeight: 600, cursor: "pointer", width: "100%",
  },
  ctaBox: {
    textAlign: "center", padding: 48, borderRadius: 16,
    background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)",
  },
  footer: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)",
    flexWrap: "wrap" as const, gap: 16,
  },
};
