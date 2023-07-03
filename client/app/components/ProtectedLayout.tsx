"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const setAuthState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const authState = user ? true : false;
      setIsAuthenticated(authState);
      if (!authState) router.push("/auth/sign-up");
    };
    setAuthState();
  }, []);
  return isAuthenticated && children;
}
