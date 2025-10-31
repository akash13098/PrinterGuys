import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ProtectedAdminRoute = ({ children }: { children: JSX.Element }) => {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        setAllowed(false);
        return;
      }

      // get role from your profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      setAllowed(profile?.role === "admin");
    };
    checkAdmin();
  }, []);

  if (allowed === null) return <p>Loading...</p>;
  if (!allowed) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedAdminRoute;
