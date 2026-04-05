export default function CTASection({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section id="community" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32 lg:px-8">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-8 py-20 text-center md:px-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-violet-400/15 blur-[60px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-[13px] font-semibold text-white/90 backdrop-blur-sm border border-white/10">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            No credit card · No trial · No limits
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-white md:text-5xl lg:text-[56px] lg:leading-[1.08]">
            Ready to build your<br className="hidden sm:block" /> Amazon empire?
          </h2>

          <p className="mx-auto mb-10 max-w-xl text-[18px] leading-[1.7] text-white/60 md:text-[20px]">
            Join thousands of sellers who use Plug Akademi's free, professional-grade tools to dominate their categories.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="group inline-flex h-16 items-center gap-3 rounded-2xl bg-white px-12 text-[17px] font-extrabold text-gray-900 shadow-2xl shadow-black/20 transition-all hover:bg-gray-50 hover:scale-[1.02]"
            >
              Get Started Free
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <a
              href="mailto:hello@plugakademi.com"
              className="inline-flex h-16 items-center gap-2 rounded-2xl border border-white/20 px-10 text-[16px] font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/30"
            >
              Talk to Our Team
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["500+ active sellers", "10K+ products analyzed", "100% free platform"].map((t) => (
              <span key={t} className="text-[13px] font-medium text-white/40">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
