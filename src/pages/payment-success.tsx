import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function PaymentSuccessPage() {
  const [, navigate] = useLocation();
  const [countdown, setCountdown] = useState(5);

  const params = new URLSearchParams(window.location.search);
  const toolId = params.get("tool_id") || "";

  const toolNames: Record<string, string> = {
    winning_product: "Winning Products",
    asin_generator: "ASIN Generator",
    tools_bundle: "Tools Bundle",
    combo_deal: "Premium Combo",
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mb-4 text-gray-500">Your access has been activated.</p>
        {toolId && toolNames[toolId] && (
          <div className="mb-6 inline-block rounded-lg bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            {toolNames[toolId]}
          </div>
        )}
        <p className="text-xs text-gray-400">Redirecting in {countdown}s...</p>
      </div>
    </div>
  );
}
