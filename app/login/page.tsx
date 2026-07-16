"use client";

import { createClient } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { YDO } from "@/docs/assets";
import LandingPage from "@/components/pages/LandingPage";
import LoginScreen from "@/components/pages/LoginPage";
import SecretKey from "@/components/pages/SecretKey";
import PhraseVerify from "@/components/pages/PhraseVerify";
import PINPage from "@/components/pages/PINPage";
import StepProgress from "@/components/pages/StepProgress";


export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [arr, setArr] = useState<{ word: string; originalIndex: number }[]>([]); // collecting random words from DUMMY_SEED_PHRASES for verification



  // dummy seed phrase
  const DUMMY_SEED_PHRASE = [
    "apple",
    "banana",
    "canary",
    "door",
    "elephant",
    "fox",
    "grape",
    "hat",
    "inside",
    "jacket",
    "kitten",
    "lemon",
  ];


  // original google login function
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
      return;
    }
    setStep(2);
  };


  // the final confirm pin button
  const confirmPIN = () => {};


  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center  ">
      <div
        className={`relative max-w-100.5 mx-auto bg-background h-full p-6.5 rounded-[10px] flex-col justify-center ${step === 0 && "flex"}`}
      >
        {/* Shared Progress Indicator */}
        {step !== 0 && (
          <div>
            {/* YDO LOGO */}
            <img src={YDO.src} />
            <StepProgress currentStep={step} />
          </div>
        )}

        {step === 0 &&
          <LandingPage onGetStarted={() => setStep(1)} />
        }

        {/* STEP 1:  LOGIN PAGE*/}
        {step === 1 && (
          <LoginScreen handleGoogleLogin={handleGoogleLogin} />
        )}

        {/* STEP 2: SECRET KEY GENERATION & BACKUP */}
        {step === 2 && (
          //
          <SecretKey seedPhrase={DUMMY_SEED_PHRASE} setArr={setArr} onNext={() => setStep(3)} />
        )}

        {/* STEP 3 : VERIFYING THE PHRASES*/}
        {step === 3 && (
          <PhraseVerify arr={arr} onFail={() => setStep(2)} onNext={() => setStep(4)} />
        )}

        {/* STEP 4: SETTING UP THE PIN */}
        {step === 4 && (
          <PINPage onNext={confirmPIN} />
        )}
      </div>
    </div>
  );
}
