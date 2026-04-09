const APP_URL = "https://www.plugakademi.org";

export default function HeroSection({ navigate }: { navigate: (p: string) => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/80 via-indigo-50/60 to-violet-100/40 blur-[100px]" />
        <div className="absolute right-[-10%] top-20 h-[350px] w-[350px] rounded-full bg-blue-100/30 blur-[80px]" />
        <div className="absolute left-[-5%] bottom-10 h-[250px] w-[250px] rounded-full bg-indigo-100/30 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center md:pt-24 md:pb-28 lg:px-8">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-blue-200/60 bg-blue-50/80 px-5 py-2 shadow-sm">
          <span className="inline-flex h-2 w-2 rounded-full bg-blue-600" />
          <span className="text-[13px] font-semibold text-blue-700 tracking-wide">100% Free — No Credit Card Required</span>
        </div>

        <h1 className="mb-6 text-[42px] font-extrabold leading-[1.05] tracking-[-0.03em] text-gray-900 sm:text-5xl md:text-[64px] lg:text-[72px]">
          The all-in-one platform
          <br className="hidden sm:block" />
          for{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Amazon FBA sellers
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8.5C50 2.5 100 2.5 150 6C200 9.5 250 4.5 298 7" stroke="url(#ug)" strokeWidth="3" strokeLinecap="round" />
              <defs><linearGradient id="ug" x1="0" y1="0" x2="300" y2="0"><stop stopColor="#2563eb" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs>
            </svg>
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-[18px] leading-[1.7] text-gray-500 md:text-[20px]">
          AI-powered analytics, real-time market intelligence, expert-led courses, and a thriving seller community.
          Everything you need to find, launch, and scale profitable products.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`${APP_URL}/register`}
            className="group relative inline-flex h-14 items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-10 text-[16px] font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:shadow-blue-600/40 hover:scale-[1.02] no-underline"
          >
            Start Building for Free
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="transition-transform group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#tools"
            className="inline-flex h-14 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 text-[16px] font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md hover:bg-gray-50"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Watch Demo
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["No setup required", "Instant access", "Cancel anytime", "Free forever"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.25 4.75 6 12 2.75 8.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
