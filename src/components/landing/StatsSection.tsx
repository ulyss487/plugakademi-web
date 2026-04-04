const STATS = [
  { value: "500+", label: "Active Sellers", desc: "Growing every week" },
  { value: "10K+", label: "Products Analyzed", desc: "Across 50+ categories" },
  { value: "50+", label: "Expert Lessons", desc: "From 6-figure sellers" },
  { value: "$2.4M+", label: "Revenue Generated", desc: "By our community" },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-blue-600/10 to-transparent" />
        <div className="absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-violet-600/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-widest text-blue-400">Platform Metrics</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">Trusted by sellers worldwide</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all hover:bg-white/[0.06] hover:border-white/[0.12]">
              <div className="mb-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">{s.value}</div>
              <div className="mb-1 text-[14px] font-semibold text-white/70">{s.label}</div>
              <div className="text-[12px] text-white/30">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
