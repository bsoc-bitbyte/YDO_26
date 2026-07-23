"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { arrow,PIN } from "@/docs/assets";



export default function PINPage({onNext}:{onNext:()=>void}){
const [isAgreed, setisAgreed] = useState(false); // for confirming the final PIN
    return(
        <>
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
              onClick={onNext}
              className="bg-primary flex items-center gap-2  rounded-[10px] border border-black py-3 w-full justify-center cursor-pointer"
            >
              Confirm
              <img src={arrow.src} alt="" />
            </button>
          </div>
        </>
    )
}