const STEPS = [
  {
    step: "01",
    title: "Create your free account",
    desc: "Sign up in 30 seconds. No credit card, no trial period, no strings attached. You get full access immediately.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>,
  },
  {
    step: "02",
    title: "Explore the toolkit",
    desc: "Dive into AI analytics, browse product leads, watch expert courses, and run your first BuyBox analysis — all from your dashboard.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>,
  },
  {
    step: "03",
    title: "Scale your business",
    desc: "Use data-driven insights to source winning products, beat competition, and grow from your first sale to six figures and beyond.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto mb-20 max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
          <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-wider">Simple Process</span>
        </div>
        <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 md:text-[44px] md:leading-[1.1]">
          Up and running in minutes
        </h2>
        <p className="text-[17px] leading-relaxed text-gray-500">
          Three simple steps to transform your Amazon business with professional-grade tools.
        </p>
      </div>

      <div className="relative grid gap-8 md:grid-cols-3">
        <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent md:block" />

        {STEPS.map((s, i) => (
          <div key={s.step} className="group relative text-center">
            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-10 transition-opacity group-hover:opacity-20" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-100 bg-white text-blue-600 shadow-sm transition-all group-hover:border-blue-200 group-hover:shadow-md">
                {s.icon}
              </div>
              {i < 2 && (
                <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-gray-300 md:block">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </div>
              )}
            </div>
            <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.2em] text-blue-600">Step {s.step}</div>
            <h3 className="mb-3 text-lg font-extrabold text-gray-900">{s.title}</h3>
            <p className="mx-auto max-w-xs text-[14px] leading-[1.7] text-gray-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
