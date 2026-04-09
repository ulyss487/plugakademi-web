import { useState } from "react";

const NAV_LINKS = [
  { label: "Tools", href: "#tools" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Community", href: "#community" },
];

export default function NavBar({ navigate }: { navigate: (p: string) => void }) {
  const [open, setOpen] = useState(false);
  const APP_URL = "https://www.plugakademi.org";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Plug Akademi" className="h-9 w-9 rounded-xl object-contain" />
          <span className="text-[17px] font-bold tracking-tight text-gray-900">Plug Akademi</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-4 py-2 text-[14px] font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`${APP_URL}/login`}
            className="text-[14px] font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href={`${APP_URL}/register`}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30 hover:brightness-110"
          >
            Get Started Free
          </a>
        </div>

        <button className="md:hidden text-gray-500" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d={open ? "M6 18 18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 md:hidden animate-in slide-in-from-top-2">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="block rounded-lg py-3 text-[15px] font-medium text-gray-600 transition-colors hover:text-gray-900" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <a href={`${APP_URL}/login`} className="rounded-xl border border-gray-200 px-5 py-3 text-[15px] font-medium text-gray-700 text-center">Sign in</a>
            <a href={`${APP_URL}/register`} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-[15px] font-semibold text-white text-center">Get Started Free</a>
          </div>
        </div>
      )}
    </header>
  );
}
