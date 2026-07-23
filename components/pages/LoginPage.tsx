"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { arrow, verified, google } from "@/docs/assets";
import Toast from "../ui/Toast";


export default function LoginPage(
  { handleGoogleLogin }: { handleGoogleLogin: () => Promise<void> }
) {
  const [email, setemail] = useState(""); // for taking input of email
  const [error, seterror] = useState(""); // for systemMessage component


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

  return (
    <>
      <div>
        {/* HEADING AND SUBHEADING */}
        <div className="mb-7 font-poppins">
          <h2 className="text-xl font-semibold">Enter Your College ID</h2>
          <p className="mt-1 text-base">
            Use your official college email to verify your campus identity and
            continue.
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
        {/* {error && <SystemMessage message={error} seterror={seterror} />}
         */}
        {error && <Toast message={error} onClose={() => seterror('')} />}

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
    </>
  );
}
