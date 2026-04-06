import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  deleteUser as firebaseDeleteUser,
  type User,
} from "firebase/auth";
import { apiFetch } from "@/lib/api";

interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: string;
  subscription_tier?: string;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone?: string, country?: string, smsConsent?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const data = await apiFetch(`/users/${firebaseUser.uid}`);
          setProfile(data);
        } catch {
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            name: firebaseUser.displayName || "",
            role: "unknown",
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string, phone?: string, country?: string, smsConsent?: boolean) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    try {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({
          uid: cred.user.uid,
          email: email,
          display_name: name,
          phone: phone || "",
          country: country || "",
          sms_consent: smsConsent || false,
          sms_consent_at: smsConsent ? new Date().toISOString() : null,
        }),
      });
    } catch (backendError: any) {
      try { await firebaseDeleteUser(cred.user); } catch {}
      const msg = backendError.message || "Failed to create account";
      if (msg.includes("Phone number is already registered")) throw new Error("This phone number is already in use.");
      if (msg.includes("Email is already registered")) throw new Error("This email is already in use.");
      if (msg.includes("Invalid phone number")) throw new Error("Invalid phone number.");
      throw new Error(msg);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
