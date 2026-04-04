import { useState, useRef, useEffect } from "react";

const API_URL = "https://api.plugakademi.org";

interface Props {
  phone: string;
  onVerified: () => void;
  onBack: () => void;
}

export default function OtpVerification({ phone, onVerified, onBack }: Props) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const sendCode = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/phone/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed to send code");
      setCodeSent(true);
      setCooldown(60);
      setTimeout(() => inputs.current[0]?.focus(), 300);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setSending(false);
    }
  };

  const verifyCode = async (otpCode?: string) => {
    const otp = otpCode || code.join("");
    if (otp.length !== 6) { setError("Please enter all 6 digits"); return; }
    setVerifying(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/phone/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Invalid code");
      onVerified();
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  };

  const handleDigit = (text: string, index: number) => {
    const digit = text.replace(/\D/g, "").slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError("");
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    if (newCode.every((d) => d !== "") && newCode.join("").length === 6) {
      setTimeout(() => verifyCode(newCode.join("")), 200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => { if (!codeSent) sendCode(); }, []);

  const maskedPhone = phone.replace(/(\+\d)(\d{3})(\d{3})(\d{4})/, "$1 (***) ***-$4");

  return (
    <div className="flex flex-col items-center py-6 px-4">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-extrabold text-gray-900">Verify Your Phone</h3>
      <p className="mb-6 text-center text-[13px] leading-5 text-gray-500">
        {codeSent ? <>Enter the 6-digit code sent to<br />{maskedPhone}</> : <>We'll send a verification code to<br />{maskedPhone}</>}
      </p>

      {codeSent && (
        <div className="mb-5 flex justify-center gap-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(r) => { inputs.current[i] = r; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigit(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              autoFocus={i === 0}
              className={`h-[54px] w-[46px] rounded-xl border-2 text-center text-[22px] font-extrabold text-gray-900 outline-none transition-all ${digit ? "border-indigo-500 bg-white" : "border-gray-200 bg-gray-50"} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20`}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="mb-4 flex w-full items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 border border-red-200">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="shrink-0 text-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
          <span className="text-[12px] font-semibold text-red-600">{error}</span>
        </div>
      )}

      {codeSent ? (
        <>
          <button onClick={() => verifyCode()} disabled={verifying || code.join("").length !== 6}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-[15px] font-extrabold text-white shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed">
            {verifying ? <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Verifying...</span> : "Verify & Create Account"}
          </button>
          <button onClick={sendCode} disabled={cooldown > 0 || sending} className="mt-3.5 text-[13px] font-semibold text-indigo-600 disabled:text-gray-400">
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend Code"}
          </button>
        </>
      ) : (
        <button onClick={sendCode} disabled={sending}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-[15px] font-extrabold text-white shadow-lg shadow-indigo-600/20 disabled:opacity-50">
          {sending ? <span className="flex items-center justify-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending...</span> : "Send Verification Code"}
        </button>
      )}

      <button onClick={onBack} className="mt-5 flex items-center gap-1 text-[13px] font-medium text-gray-500 hover:text-gray-700">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
        Back to form
      </button>
    </div>
  );
}
