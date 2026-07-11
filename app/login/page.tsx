"use client";

import { createClient } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/pages/LandingPage";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          hd: "iiitdmj.ac.in",
        },
      },
    });

    if (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return <LandingPage onGetStarted={handleGoogleLogin} />;
}
