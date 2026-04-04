import { useLocation } from "wouter";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Tools", href: "#tools" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const TOOLS = [
  {
    title: "PlugGPT AI Assistant",
    desc: "Your personal AI business advisor. Get instant answers on sourcing, pricing, competition analysis, and scaling strategies.",
    tag: "AI-Powered",
    gradient: "from-violet-500 to-indigo-500",
    lightBg: "bg-violet-50",
    iconColor: "text-violet-600",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>,
  },
  {
    title: "BuyBox Analyzer",
    desc: "Deep-dive into BuyBox ownership, seller rotation patterns, and competitive landscape with real-time Keepa data.",
    tag: "Real-Time Data",
    gradient: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  },
  {
    title: "Profit Calculator",
    desc: "Estimate ROI, Amazon fees, shipping costs, and net margins before you invest a single dollar.",
    tag: "Smart Math",
    gradient: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" /></svg>,
  },
];

const FEATURES = [
  {
    title: "Curated Product Leads",
    desc: "Verified, profitable product opportunities delivered weekly by our expert sourcing team.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
  },
  {
    title: "Video Courses Library",
    desc: "Step-by-step training from beginner basics to advanced six-figure scaling strategies.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
  },
  {
    title: "Seller Community",
    desc: "Connect with ambitious sellers. Share strategies, celebrate wins, and grow together.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
  },
  {
    title: "Live Coaching Sessions",
    desc: "Weekly group sessions with experienced sellers. Get direct feedback on your business.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  },
  {
    title: "Gamification & Rewards",
    desc: "Earn points, level up, and unlock badges as you progress on your seller journey.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m5.25-6.624V2.721" /></svg>,
  },
  {
    title: "Marketing Suite",
    desc: "Built-in email and SMS tools to grow your audience and engage customers automatically.",
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
  },
];

const STATS = [
  { value: "500+", label: "Active Sellers" },
  { value: "10K+", label: "Products Analyzed" },
  { value: "50+", label: "Expert Lessons" },
  { value: "100%", label: "Free to Use" },
];

export default function LandingPage() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <Nav navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero navigate={navigate} />
      <LogoBar />
      <ToolsShowcase navigate={navigate} />
      <StatsSection />
      <FeaturesGrid />
      <CTASection navigate={navigate} />
      <Footer />
    </div>
  );
}

function Nav({ navigate, menuOpen, setMenuOpen }: { navigate: (p: string) => void; menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">P</div>
          <span className="text-[15px] font-semibold tracking-tight text-gray-900">Plug Akademi</span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900">{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={() => navigate("/login")} className="text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900">Log in</button>
          <button onClick={() => navigate("/login")} className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-gray-800">Get Started Free</button>
        </div>
        <button className="md:hidden text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d={menuOpen ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-gray-100 px-6 py-4 md:hidden bg-white">
          {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="block py-2.5 text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
          <button onClick={() => navigate("/login")} className="mt-3 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white">Get Started Free</button>
        </div>
      )}
    </header>
  );
}

function Hero({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-[100px]" />
        <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-violet-100/40 blur-[80px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-20 text-center md:pt-28 md:pb-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-4 py-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[13px] font-medium text-indigo-700">100% Free Platform</span>
        </div>
        <h1 className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 md:text-[56px]">
          The ultimate toolkit for{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Amazon FBA sellers</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-gray-500">
          AI-powered analytics, expert courses, curated product leads, and a thriving community — all in one platform, completely free.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button onClick={() => navigate("/login")} className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gray-900 px-8 text-[15px] font-semibold text-white shadow-lg shadow-gray-900/10 transition-all hover:bg-gray-800 hover:shadow-gray-900/20">
            Get Started — It's Free
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
          <a href="#tools" className="inline-flex h-12 items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 text-[15px] font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50">
            Explore Tools
          </a>
        </div>
      </div>
    </section>
  );
}

function LogoBar() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-6">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6">
        {["Amazon FBA", "Keepa Analytics", "AI-Powered", "Real-Time Data", "Expert Training"].map((t) => (
          <span key={t} className="text-[13px] font-semibold tracking-wide text-gray-300 uppercase">{t}</span>
        ))}
      </div>
    </section>
  );
}

function ToolsShowcase({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-indigo-600">Professional Tools</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Built for serious sellers</h2>
        <p className="text-[16px] leading-relaxed text-gray-500">Enterprise-grade tools that give you an unfair advantage on Amazon.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {TOOLS.map((t) => (
          <div key={t.title} className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-8 transition-all hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
            <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${t.lightBg} ${t.iconColor}`}>{t.icon}</div>
            <div className={`mb-3 inline-block rounded-full bg-gradient-to-r ${t.gradient} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white`}>{t.tag}</div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{t.title}</h3>
            <p className="mb-6 text-[14px] leading-relaxed text-gray-500">{t.desc}</p>
            <button onClick={() => navigate("/login")} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
              Try it free
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-gray-900 py-16">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">{s.value}</div>
            <div className="mt-1 text-[13px] font-medium text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[13px] font-semibold uppercase tracking-widest text-indigo-600">Everything Included</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">One platform, zero compromises</h2>
        <p className="text-[16px] leading-relaxed text-gray-500">Every tool, resource, and community you need — included for free.</p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex flex-col bg-white p-7">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">{f.icon}</div>
            <h3 className="mb-2 text-[15px] font-bold text-gray-900">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-8 py-20 text-center md:px-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-[60px]" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/80 backdrop-blur-sm">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            No credit card required
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">Start selling smarter today</h2>
          <p className="mx-auto mb-10 max-w-lg text-[17px] leading-relaxed text-white/70">
            Join thousands of Amazon sellers using Plug Akademi's free tools to find profitable products, analyze competition, and scale faster.
          </p>
          <button onClick={() => navigate("/login")} className="group inline-flex h-14 items-center gap-2 rounded-xl bg-white px-10 text-[16px] font-bold text-gray-900 shadow-2xl shadow-black/20 transition-all hover:bg-gray-50">
            Create Free Account
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 to-violet-600 text-[10px] font-bold text-white">P</div>
          <span className="text-[13px] font-medium text-gray-400">Plug Akademi</span>
        </div>
        <p className="text-[12px] text-gray-300">&copy; {new Date().getFullYear()} Plug Akademi. All rights reserved.</p>
        <div className="flex gap-6 text-[12px] text-gray-400">
          <a href="mailto:hello@plugakademi.com" className="transition-colors hover:text-gray-600">Contact</a>
          <a href="#" className="transition-colors hover:text-gray-600">Terms</a>
          <a href="#" className="transition-colors hover:text-gray-600">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
