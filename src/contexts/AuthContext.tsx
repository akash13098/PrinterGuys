// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Run only once on mount
  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };
    init();

    // 🔹 Auth state listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) upsertUserRow(currentUser);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 🔹 Add or update user record
  const upsertUserRow = async (curUser: any) => {
    try {
      const id = curUser.id;
      const email = curUser.email;
      const name = curUser.user_metadata?.name || curUser.user_metadata?.full_name || "";

      const { error } = await supabase
        .from("users")
        .upsert({ id, email, name, created_at: new Date().toISOString() }, { onConflict: "id" });

      if (error) console.error("Upsert failed:", error);
      else console.log("User synced:", email);
    } catch (err) {
      console.error("Upsert error:", err);
    }
  };

  // 🔹 Login
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  // 🔹 Signup
  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) alert(error.message);
    else alert("✅ Signup successful! Verify your email before login.");
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem("supabase.auth.token");
      sessionStorage.clear();
      console.log("✅ Logged out");
      window.location.href = "/"; // reset UI instantly
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
