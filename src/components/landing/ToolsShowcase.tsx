const TOOLS = [
  {
    title: "PlugGPT AI Assistant",
    subtitle: "Your personal business strategist",
    desc: "Ask anything about sourcing, pricing, competition, or scaling. Our AI understands the Amazon ecosystem inside out and delivers actionable insights in seconds.",
    features: ["Sourcing strategy optimization", "Competitive analysis reports", "Pricing & margin recommendations", "Supplier negotiation scripts"],
    gradient: "from-blue-600 to-indigo-600",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200/60",
    hoverBorder: "hover:border-blue-300",
    iconColor: "text-blue-600",
    tagBg: "bg-blue-600",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>,
  },
  {
    title: "BuyBox Analyzer",
    subtitle: "Real-time competitive intelligence",
    desc: "Deep-dive into BuyBox ownership, track seller rotation patterns, identify weak competitors, and find the perfect entry points with live Keepa data integration.",
    features: ["BuyBox share breakdown", "Seller rotation tracking", "Historical price trends", "Competition gap analysis"],
    gradient: "from-violet-600 to-purple-600",
    lightBg: "bg-violet-50",
    borderColor: "border-violet-200/60",
    hoverBorder: "hover:border-violet-300",
    iconColor: "text-violet-600",
    tagBg: "bg-violet-600",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  },
  {
    title: "Profit Calculator",
    subtitle: "Make every dollar count",
    desc: "Estimate ROI, Amazon fees, FBA costs, shipping expenses, and net margins before you invest. Model different scenarios and make data-driven sourcing decisions.",
    features: ["Full FBA fee breakdown", "Multi-scenario modeling", "Shipping cost estimator", "Break-even analysis"],
    gradient: "from-emerald-600 to-teal-600",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200/60",
    hoverBorder: "hover:border-emerald-300",
    iconColor: "text-emerald-600",
    tagBg: "bg-emerald-600",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  },
];

export default function ToolsShowcase({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto mb-20 max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743" /></svg>
          <span className="text-[13px] font-bold text-blue-700 uppercase tracking-wider">Professional Tools</span>
        </div>
        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 md:text-[44px] md:leading-[1.1]">
          Enterprise-grade tools,<br className="hidden md:block" /> completely free
        </h2>
        <p className="text-[17px] leading-relaxed text-gray-500">
          Every tool is built with the same rigor used by 8 and 9-figure sellers. No feature gates, no trials, no hidden costs.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <div key={t.title} className={`group relative flex flex-col overflow-hidden rounded-3xl border ${t.borderColor} bg-white p-8 transition-all duration-300 ${t.hoverBorder} hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1`}>
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />

            <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${t.lightBg} ${t.iconColor}`}>
              {t.icon}
            </div>

            <div className={`mb-4 inline-flex self-start rounded-full ${t.tagBg} px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white`}>
              {t.title.split(" ").pop()}
            </div>

            <h3 className="mb-1 text-xl font-extrabold text-gray-900">{t.title}</h3>
            <p className="mb-3 text-[13px] font-semibold text-gray-400">{t.subtitle}</p>
            <p className="mb-6 text-[14px] leading-[1.7] text-gray-500">{t.desc}</p>

            <ul className="mb-8 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${t.iconColor}`}>
                    <path d="M13.25 4.75 6 12 2.75 8.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button onClick={() => navigate("/login")} className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${t.gradient} px-6 py-3 text-[14px] font-bold text-white transition-all hover:brightness-110 hover:shadow-lg`}>
              Try {t.title.split(" ")[0]} Free
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
