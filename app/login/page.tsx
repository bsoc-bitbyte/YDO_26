"use client";

import { createClient } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { YDO, YDO_home, close, arrow, google,verified,warn,secure,PIN,clip_board } from "@/docs/assets";
import LandingPage from "@/components/pages/LandingPage";


// systemMessage
const SystemMessage = ({
  message,
  seterror,
}: {
  message: string;
  seterror: (value: string) => void;
}) => {
  return (
    <div className="absolute  z-50  inset-0 animate-fade-in backdrop-blur-[1px]  flex justify-center items-center">
      <div className="border border-black rounded-lg bg-white box-content mx-10 ">
        <div className="font-prime text-xl flex p-3 bg-foreground rounded-t-lg border-b items-center gap-4 justify-between">
          <div className="flex gap-4 items-center">
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="29" height="29" fill="#F9B73C" />
            </svg>
            System Message
          </div>
          <button className="justify-self-end" onClick={() => seterror("")}>
            <img src={close.src} alt="" />
          </button>
        </div>
        <div className="font-prime text-base p-5 text-center"> {message}</div>
      </div>
    </div>
  );
};

const StepProgress = ({ currentStep }: { currentStep: number }) => {
  const getStepClass = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return "bg-[#6AD366]"; // Completed steps
    }
    if (stepNumber === currentStep) {
      return "bg-black text-white"; // Current step (inverse color)
    }
    return ""; // Future steps
  };

  return (
    <div className="w-88 h-25 border border-black px-13 py-8 rounded-xl bg-white my-5 font-poppins text-xs leading-6.25 tracking-[1px]">
      <div className="flex items-center">
        <div
          className={`h-5 w-5 rounded-full border border-black flex justify-center items-center ${getStepClass(1)}`}
        >
          1
        </div>
        <div className="h-0.5 flex-1 bg-black"></div>
        <div
          className={`h-5 w-5 rounded-full border border-black flex justify-center items-center ${getStepClass(2)}`}
        >
          2
        </div>
        <div className="h-0.5 flex-1 bg-black"></div>

        <div
          className={`h-5 w-5 rounded-full border border-black flex justify-center items-center ${getStepClass(3)}`}
        >
          3
        </div>
        <div className="h-0.5 flex-1 bg-black"></div>

        <div
          className={`h-5 w-5 rounded-full border border-black flex justify-center items-center ${getStepClass(4)}`}
        >
          4
        </div>
      </div>
      <div className="flex justify-between">
        <div>Step {currentStep} of 4</div>
        <div>Security Setup</div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [email, setemail] = useState(""); // for taking input of email
  const [error, seterror] = useState(""); // for systemMessage component
  const [isAgreed, setisAgreed] = useState(false); // for confirming the final PIN

  const [arr, setArr] = useState<{ word: string; originalIndex: number }[]>([]); // collecting random words from DUMMY_SEED_PHRASES for verification
  const [inputValue, setInputValue] = useState<Record<number, string>>({}); // taking user input of step 3

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

  // the final confirm pin button
  const confirmPIN = () => {};

  // original google login fn
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

  // checking if email is of our institute or not
  const checkEmail = () => {
    const isValid = email.trim().toLocaleLowerCase().endsWith("@iiitdmj.ac.in");
    if (!isValid) {
      seterror(
        "Please use your official Indian Institute of Information Technology,Jabalpur email address.",
      );
      return;
    }

    handleGoogleLogin();
  };

  // verifying phrases in step 3
  const verifyPhrase = () => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].word.toLowerCase() !==
        (inputValue[i]?.trim().toLowerCase() || "")
      ) {
        seterror(
          "The words you entered do not match your recovery phrase. Please check and try again.",
        );
        return;
      }
    }
    setStep(4);
  };


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

        {step ===0 &&  
        <LandingPage onGetStarted={()=>setStep(1)} />
        }

        {/* STEP 1:  LOGIN PAGE*/}
        {step === 1 && (
          <div>
            {/* HEADING AND SUBHEADING */}
            <div className="mb-7 font-poppins">
              <h2 className="text-xl font-semibold">Enter Your College ID</h2>
              <p className="mt-1 text-base">
                Use your official college email to verify your campus identity
                and continue.
              </p>
            </div>
            {/* EMAIL INPUT */}
            <div className="relative mb-4 font-poppins text-xs">
              <p className="absolute left-5 -top-2 bg-white rounded-xl px-2">
                Email
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full bg-white p-5 border border-black rounded-[10px] outline-none"
              />
            </div>

            {/* CONFIRM BUTTON */}
            <div>
              <button
                className="bg-primary flex items-center gap-2 text-base rounded-[10px] border font-poppins border-black py-3 justify-center cursor-pointer w-full"
                onClick={checkEmail}
              >
                Confirm
                <img src={arrow.src} alt="" />
              </button>
            </div>

            {/* ERROR IF EMAIL IS NOT FROM OUR INSTITUTE */}
            {error && <SystemMessage message={error} seterror={seterror} />}

            {/* OR CONTINUINNG WITH GOOGLE */}
            <div className="flex justify-center items-center mt-15 mb-4 font-poppins text-xs font-light">
              <p className=" flex-1"> -------------------</p>
              <p>or continue with</p>
              <p className=" flex-1"> -------------------</p>
            </div>
            <div>
              <button
                className="bg-secondary flex items-center gap-2 font-poppins text-base rounded-[10px] border border-black py-3 justify-center cursor-pointer w-full mb-2"
                onClick={handleGoogleLogin}
              >
                <img src={google.src} alt="" />
                Continue with Google
              </button>

              <div className="flex justify-center items-center gap-1 font-poppins text-xs">
                <img src={verified.src} alt="" />
                Use @iiitdmj.ac.in account
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SECRET KEY GENERATION & BACKUP */}
        {step === 2 && (
          //
          <div className=" flex flex-col gap-4  font-poppins">
            {/* HEADING AND SUBHEADING */}
            <div>
              <h2 className="text-xl font-semibold">Your Secret Key</h2>
              <p className="text-base ">
                This secret phrase is the master key to YDO account. Keep it
                offline and secure.
              </p>
            </div>

            {/* ALERT */}
            <div className="flex bg-[#FB505040] font-sans text-[14px] border border-black rounded-[10px] gap-3 px-6 py-1 ">
             <img src={warn.src} alt="" className="w-5 h-full mt-1"/>

              <p className="text-sm">
                Keep these words safe. This phrase is the only way to recover
                your vault. Do not share it with anyone.
              </p>
            </div>

            {/* Seed Phrase Container Grid */}
            <div className="grid grid-cols-2 gap-2 p-5 bg-white rounded-[10px] border border-black w-full">
              {DUMMY_SEED_PHRASE.map((word, index) => (
                <div
                  key={index}
                  className="bg-foreground pl-5 py-3 w-full font-prime text-base rounded-lg  border border-black"
                >
                  <span className="text-gray-500 mr-1 text-xs">
                    {" "}
                    {index < 9 ? "0" : ""}
                    {index + 1}
                  </span>
                  <span>{word}</span>
                </div>
              ))}

              <button
                onClick={() =>
                  navigator.clipboard.writeText(DUMMY_SEED_PHRASE.join(" "))
                }
                className=" col-span-2 rounded-lg text-sm flex justify-center items-center cursor-pointer gap-2 border border-black p-3 mt-3"
              >
                <img src={clip_board.src} alt="" />
                COPY TO CLIPBOARD
              </button>
            </div>

            {/* DOWNLOAD PHRASE BUTTON */}
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(DUMMY_SEED_PHRASE.join(" "))}`}
              download="ydo-recovery-phrase.txt"
              className="bg-primary  flex items-center gap-2 text-base rounded-[10px] border border-black py-3 w-full justify-center cursor-pointer"
            >
              Download Recovery File
            </a>

            {/* NEXT STEP BUTTON  */}
            <button
              className="bg-secondary flex items-center gap-2 text-base rounded-[10px] border border-black py-3 w-full justify-center cursor-pointer"
              // GETTING RANDOM PHRASES
              onClick={() => {
                const idx1 = Math.floor(
                  Math.random() * DUMMY_SEED_PHRASE.length,
                );
                let idx2 = Math.floor(Math.random() * DUMMY_SEED_PHRASE.length);
                while (idx1 === idx2) {
                  idx2 = Math.floor(Math.random() * DUMMY_SEED_PHRASE.length);
                }
                setArr([
                  { word: DUMMY_SEED_PHRASE[idx1], originalIndex: idx1 + 1 },
                  { word: DUMMY_SEED_PHRASE[idx2], originalIndex: idx2 + 1 },
                ]);
                setStep(3);
              }}
            >
              I&apos;ve Saved it
            </button>
          </div>
        )}

        {/* STEP 3 : VERIFYING THE PHRASES*/}
        {step === 3 && (
          <div className="flex flex-col gap-4 font-poppins">
            {/* HEADING AND SUBHEADING */}
            <div>
              <h2 className="text-xl font-semibold">Verify Phrase</h2>
              <p className="text-base ">
                Type the requested words from your recovery phrase to confirm
                your backup.
              </p>
            </div>

            {/* MAPPING INPUT FOR VERFYING */}
            {arr.map((word, index) => (
              <div
                key={index}
                className="bg-foreground p-4 rounded-lg   border border-black gap-2 flex flex-col"
              >
                <div className="flex items-center">
                  <span className="rounded border font-semibold border-black py-0.5 px-2 mr-1 text-[10px] bg-[#F9B63C]">
                    {word.originalIndex < 9 ? "0" : ""}
                    {word.originalIndex}
                  </span>
                  <p className="text-base">Word Number {word.originalIndex}</p>
                </div>
                {/* INPUT FOR PHRASES */}
                <input
                  type="text"
                  placeholder={`Type word #${word.originalIndex}`}
                  className="bg-white font-prime w-full px-6 py-4 rounded-lg outline-none border text-base border-black"
                  onChange={(e) => {
                    setInputValue((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }));
                  }}
                />
              </div>
            ))}

            {/* VERIFIFCATION TEXT */}
            <div className="flex bg-white border border-black rounded-[10px] gap-3 px-6 py-3 text-base ">
              <img src={secure.src} alt="" className="w-3 mb-10"/>

              <p className="text-base">
                Verification happens locally. Your seed phrase never leaves this
                secure environment.
              </p>
            </div>

            {/* BUTTON TO CONTINUE OR GO BACK TO PREVIOUS STEP(in case they forget the phrases) */}
            <div className="text-center">
              <button
                className="bg-primary flex items-center gap-2 text-base rounded-[10px] border border-black py-3 w-full justify-center cursor-pointer"
                onClick={verifyPhrase}
              >
                Continue
                <img src={arrow.src} alt="" />
              </button>
              <button onClick={() => setStep(2)} className="cursor-pointer">
                Lost phrase? Start over
              </button>
            </div>

            {/* ERROR IF THE INPUTS ARE WRONG */}
            {error && <SystemMessage message={error} seterror={seterror} />}
          </div>
        )}

        {/* STEP 4: SETTING UP THE PIN */}
        {step === 4 && (
          <div className="flex flex-col gap-5 font-poppins">
            {/* HEADING AND SUBHEADING */}
            <div>
              <h2 className="text-xl font-semibold">Create a 4-digit PIN </h2>
              <p className="text-base ">
                Choose a PIN that’s easy for you to remember but hard to guess.
              </p>
            </div>

            {/*  ENTER PIN INPUT*/}
            <div className="bg-foreground p-4 rounded-lg text-base  border border-black gap-2 flex flex-col">
              <div className="flex items-center">
                <span className="rounded border border-black p-0.5  mr-1 text-xs bg-[#F9B63C]">
                  <img src={PIN.src} alt="" />
                </span>
                <p>Enter your PIN</p>
              </div>
              <input
                type="text"
                placeholder={`Enter 4-digit PIN`}
                className="bg-white w-full px-6 py-4 font-prime rounded-lg outline-none border border-black"
                minLength={4}
                maxLength={4}
                required
              />
            </div>

            {/* CHECKBOX COMFIRMING TO PROCEED */}
            <div className="flex bg-white border border-black rounded-[10px] gap-3 px-6 py-3  ">
              <label className="mt-1">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setisAgreed(e.target.checked)}
                  className="sr-only"
                />

                <div
                  className={`w-4  h-4 rounded border border-black flex items-center justify-center transition-colors ${
                    isAgreed ? "bg-[#F9B63C]" : "bg-white"
                  }`}
                >
                  {isAgreed && (
                    <svg
                      className="w-4 h-4 text-black stroke-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </label>

              <p className="text-base">
                Verification happens locally. Your seed phrase never leaves this
                secure environment.
              </p>
            </div>

            {/* CONFIRM BUTTON */}
            <button
              onClick={confirmPIN}
              className="bg-primary flex items-center gap-2  rounded-[10px] border border-black py-3 w-full justify-center cursor-pointer"
            >
              Confirm
              <img src={arrow.src} alt="" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
