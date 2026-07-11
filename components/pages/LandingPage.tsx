"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import StudentCapsule from "@/components/ui/StudentCapsule";
import Toast from "@/components/ui/Toast";
import { useToast } from "@/lib/useToast";



export default function LandingPage() {
  const { toast, showToast, hideToast } = useToast();
  const router = useRouter();
  return (
    <main
      className="min-h-screen w-full relative overflow-x-hidden 
      bg-(--color-background) flex flex-col 
      items-center justify-between
      pt-44 pb-48 px-6 gap-0"
    >
        <img
            src="/assets/Curls.svg"
            alt=""
            className="absolute inset-0 
            w-full h-full 
            object-fill 
            pointer-events-none
            z-0
            sm:hidden"
        />

    <div className="flex flex-col items-center gap-2 z-10">
      <Image
        src="/assets/YDO.svg"
        width={273}
        height={95}
        alt="YDO"
        priority
      />
      <p style={{ fontFamily: 'var(--font-poppins)' }} className=" 
      text-(--text-xs) text-(--color-stroke) 
      tracking-wide">
        You Deserve One
      </p>
    </div>
    
      <p style={{ fontFamily: 'var(--font-poppins)' }} className=" 
      text-[16px] text-(--color-stroke) 
      text-center max-w-[280px] leading-relaxed z-10">
        A campus matchmaking experience built around privacy, mutual interest & meaningful{" "}
        <br />
        <span className="text-(--color-foreground) font-bold">Connections.</span>
    </p>

     <div className="flex flex-col items-center gap-2 z-10">
        <PrimaryButton onClick={() => router.push('/login')}>Get Started →</PrimaryButton>
        <StudentCapsule />
    </div>

    {toast && (
      <Toast
        title={toast.title}
        message={toast.message}
        action={toast.action}
        onClose={hideToast}
      />
  )}
    </main>
  );
}