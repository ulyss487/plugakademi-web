const TESTIMONIALS = [
  {
    quote: "Plug Akademi's BuyBox Analyzer helped me identify a niche where I now generate $15K/month in profit. The data accuracy is incredible.",
    name: "Marcus T.",
    role: "6-Figure FBA Seller",
    avatar: "M",
    color: "bg-blue-600",
  },
  {
    quote: "The AI assistant is like having a senior consultant on speed dial. I used to spend hours on research — now I get answers in seconds.",
    name: "Sarah K.",
    role: "Amazon Private Label",
    avatar: "S",
    color: "bg-violet-600",
  },
  {
    quote: "I went from zero to my first $5K month in 8 weeks using the courses and product leads. And it's all free — that's insane.",
    name: "David L.",
    role: "New Seller, 3 Months In",
    avatar: "D",
    color: "bg-emerald-600",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1.5">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-violet-600"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
            <span className="text-[13px] font-bold text-violet-700 uppercase tracking-wider">Success Stories</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight text-gray-900 md:text-[44px] md:leading-[1.1]">
            Sellers love Plug Akademi
          </h2>
          <p className="text-[17px] leading-relaxed text-gray-500">
            Real results from real sellers who are building profitable businesses with our free tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="group relative rounded-2xl border border-gray-200/80 bg-white p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-100">
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div>
              <p className="mb-8 text-[15px] leading-[1.8] text-gray-600 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-[14px] font-bold text-white`}>{t.avatar}</div>
                <div>
                  <div className="text-[14px] font-bold text-gray-900">{t.name}</div>
                  <div className="text-[12px] font-medium text-gray-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
