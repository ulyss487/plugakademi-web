import { useLocation } from "wouter";

export default function NotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100">
        <span className="text-[36px] font-extrabold text-gray-300">404</span>
      </div>
      <h1 className="text-xl font-bold text-gray-900">Page not found</h1>
      <p className="text-[14px] text-gray-500">The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate("/")} className="mt-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-indigo-700">
        Go Home
      </button>
    </div>
  );
}
