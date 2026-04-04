import { useLocation } from "wouter";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
];

const FEATURES = [
  {
    title: "AI Business Assistant",
    desc: "PlugGPT speaks your language. Get instant answers about sourcing, pricing, and strategy — in Haitian Creole.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: "Curated Product Leads",
    desc: "Every week, our team delivers verified, profitable product opportunities straight to your dashboard.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Expert-Led Courses",
    desc: "Step-by-step video training — from your first product to six-figure scaling strategies.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "BuyBox Intelligence",
    desc: "Analyze competition, track seller rotation, and find winning opportunities with real-time Amazon data.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "Seller Community",
    desc: "Connect with hundreds of Haitian sellers. Share wins, get feedback, and grow together.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Profit Calculator",
    desc: "Estimate ROI, fees, and margins before you invest. Make every sourcing decision with confidence.",
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
      </svg>
    ),
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Perfect to explore the platform",
    items: ["5 AI questions per day", "Basic course access", "Community access", "Profit calculator"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    desc: "For serious sellers ready to scale",
    items: ["Unlimited AI assistant", "All video courses", "Weekly product leads", "BuyBox analyzer", "Priority support"],
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "$59",
    period: "per month",
    desc: "Maximum growth with 1-on-1 coaching",
    items: ["Everything in Pro", "1-on-1 coaching sessions", "Exclusive product leads", "Early access to features", "Direct Slack channel"],
    cta: "Go Elite",
  },
];

const STATS = [
  { value: "500+", label: "Active Sellers" },
  { value: "10K+", label: "Products Sourced" },
  { value: "50+", label: "Video Lessons" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <Nav navigate={navigate} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <Hero navigate={navigate} />
      <StatsBar />
      <Features />
      <Pricing navigate={navigate} />
      <CTA navigate={navigate} />
      <Footer />
    </div>
  );
}

function Nav({ navigate, mobileMenuOpen, setMobileMenuOpen }: { navigate: (p: string) => void; mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold">P</div>
          <span className="text-[15px] font-semibold tracking-tight">Plug Akademi</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] font-medium text-white/50 transition-colors hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => navigate("/login")} className="text-[13px] font-medium text-white/60 transition-colors hover:text-white">Log in</button>
          <button onClick={() => navigate("/login")} className="rounded-lg bg-white px-4 py-2 text-[13px] font-semibold text-[#09090b] transition-all hover:bg-white/90">Get Started</button>
        </div>
        <button className="md:hidden text-white/60" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.06] px-6 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="block py-2 text-sm text-white/60" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
          ))}
          <button onClick={() => navigate("/login")} className="mt-3 w-full rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#09090b]">Get Started</button>
        </div>
      )}
    </header>
  );
}

function Hero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-24 text-center md:pt-32 md:pb-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[13px] font-medium text-white/60">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Built for Haitian Amazon Sellers
        </div>
        <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          Build a profitable
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Amazon FBA business</span>
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/50 md:text-lg">
          Tools, education, and AI-powered guidance — everything you need in one platform. Start free, scale with confidence.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button onClick={() => navigate("/login")} className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-[15px] font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30">
            Start for Free
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
          <a href="#features" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/[0.1] px-8 text-[15px] font-medium text-white/70 transition-all hover:border-white/20 hover:text-white">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.02]">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className={`flex flex-col items-center py-8 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}>
            <span className="text-2xl font-bold tracking-tight md:text-3xl">{s.value}</span>
            <span className="mt-1 text-xs font-medium text-white/40">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-violet-400">Platform</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Everything you need to succeed</h2>
        <p className="text-base text-white/40">From product research to scaling — one platform, zero guesswork.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">{f.icon}</div>
            <h3 className="mb-2 text-[15px] font-semibold">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-white/40">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="pricing" className="border-t border-white/[0.06] bg-white/[0.01] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-violet-400">Pricing</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Simple, transparent pricing</h2>
          <p className="text-base text-white/40">Start free. Upgrade when you're ready to go further.</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-2xl border p-6 transition-all ${p.highlight ? "border-violet-500/40 bg-violet-500/[0.05] shadow-lg shadow-violet-500/5" : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}>
              {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-0.5 text-[11px] font-semibold">Popular</div>}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-[13px] text-white/40">{p.desc}</p>
              <div className="mt-5 mb-6">
                <span className="text-4xl font-bold tracking-tight">{p.price}</span>
                <span className="ml-1 text-sm text-white/30">/{p.period}</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-white/60">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-violet-400"><path d="M13.25 4.75 6 12 2.75 8.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate("/login")} className={`w-full rounded-xl py-2.5 text-[13px] font-semibold transition-all ${p.highlight ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90" : "border border-white/[0.1] text-white/70 hover:border-white/20 hover:text-white"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="community" className="mx-auto max-w-6xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-600/10 px-8 py-16 text-center md:px-16">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_70%)]" />
        <div className="relative">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to start your Amazon journey?</h2>
          <p className="mx-auto mb-8 max-w-md text-base text-white/40">
            Join hundreds of Haitian entrepreneurs building successful businesses with Plug Akademi.
          </p>
          <button onClick={() => navigate("/login")} className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-[15px] font-semibold text-[#09090b] transition-all hover:bg-white/90">
            Create Free Account
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-bold">P</div>
          <span className="text-[13px] font-medium text-white/40">Plug Akademi</span>
        </div>
        <p className="text-[12px] text-white/25">&copy; {new Date().getFullYear()} Plug Akademi. All rights reserved.</p>
        <div className="flex gap-6 text-[12px] text-white/30">
          <a href="mailto:hello@plugakademi.com" className="transition-colors hover:text-white/50">Contact</a>
          <a href="#" className="transition-colors hover:text-white/50">Terms</a>
          <a href="#" className="transition-colors hover:text-white/50">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
