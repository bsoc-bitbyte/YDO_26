"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { arrow, secure } from "@/docs/assets";
import Toast from "../ui/Toast";

interface SelectedWord {
  word: string;
  originalIndex: number;
}


interface Step3Props { onNext: () => void; onFail: () => void; arr: SelectedWord[] }

export default function PhraseVerify({ onNext, onFail, arr }: Step3Props) {


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
        onNext();
    };
    const [error, seterror] = useState(""); // for systemMessage component
    const [inputValue, setInputValue] = useState<Record<number, string>>({}); // taking user input of step 3
    return (
        <>
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
                    <img src={secure.src} alt="" className="w-3 mb-10" />

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
                    <button onClick={onFail} className="cursor-pointer">
                        Lost phrase? Start over
                    </button>
                </div>

                {/* ERROR IF THE INPUTS ARE WRONG */}
                {error && <Toast message={error} onClose={() => seterror("")} />}
            </div>
        </>
    )
}