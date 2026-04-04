const FEATURES = [
  {
    title: "Curated Product Leads",
    desc: "Verified, profitable product opportunities delivered weekly by our expert sourcing team. Each lead includes margin analysis, competition data, and supplier contacts.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Expert Video Courses",
    desc: "Step-by-step training from beginner basics to advanced six-figure scaling strategies. Updated monthly with new market trends and techniques.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Seller Community",
    desc: "Connect with ambitious sellers worldwide. Share strategies, celebrate wins, get feedback, and build lasting partnerships that accelerate your growth.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg>,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "Live Coaching Sessions",
    desc: "Weekly group sessions with experienced 7-figure sellers. Get direct feedback on your product research, listing strategy, and business decisions.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    title: "Gamification & Rewards",
    desc: "Earn XP, level up, and unlock exclusive badges as you progress. Track your journey, compete on leaderboards, and stay motivated every step of the way.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m5.25-6.624V2.721" /></svg>,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Marketing Suite",
    desc: "Built-in email campaigns, SMS outreach, and audience segmentation tools. Grow your customer base and drive repeat purchases on autopilot.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-gray-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-indigo-600"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
            <span className="text-[13px] font-bold text-indigo-700 uppercase tracking-wider">Everything Included</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 md:text-[44px] md:leading-[1.1]">
            One platform,<br className="hidden md:block" /> zero compromises
          </h2>
          <p className="text-[17px] leading-relaxed text-gray-500">
            Everything you need to build, grow, and scale your Amazon business — all included at no cost.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-7 transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-0.5">
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} ${f.color} transition-transform duration-300 group-hover:scale-110`}>
                {f.icon}
              </div>
              <h3 className="mb-2 text-[17px] font-bold text-gray-900">{f.title}</h3>
              <p className="text-[14px] leading-[1.7] text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
