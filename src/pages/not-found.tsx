import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-[80px] font-extrabold text-gray-200 leading-none">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-2 text-[15px] text-gray-500">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => setLocation("/")}
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 text-[14px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back to Home
        </button>
      </div>
    </div>
  );
}
