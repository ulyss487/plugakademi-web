import { useLocation } from "wouter";

export default function PaymentCancelPage() {
  const [, navigate] = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Cancelled</h1>
        <p className="mb-6 text-gray-500">No charges were made. You can try again anytime.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
