"use client";
import { useState,Dispatch, SetStateAction} from "react";
import { useRouter } from "next/navigation";
import { warn,clip_board } from "@/docs/assets";


interface SelectedWord {
  word: string;
  originalIndex: number;
}

interface SecretKeyProps {
  seedPhrase: string[];
  onNext: () => void;
  setArr:Dispatch<SetStateAction<SelectedWord[]>>;
}

export default function SecretKey({ seedPhrase, onNext,setArr }: SecretKeyProps){


    return(
        <>
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
              {seedPhrase.map((word, index) => (
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
                  navigator.clipboard.writeText(seedPhrase.join(" "))
                }
                className=" col-span-2 rounded-lg text-sm flex justify-center items-center cursor-pointer gap-2 border border-black p-3 mt-3"
              >
                <img src={clip_board.src} alt="" />
                COPY TO CLIPBOARD
              </button>
            </div>

            {/* DOWNLOAD PHRASE BUTTON */}
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(seedPhrase.join(" "))}`}
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
                  Math.random() * seedPhrase.length,
                );
                let idx2 = Math.floor(Math.random() * seedPhrase.length);
                while (idx1 === idx2) {
                  idx2 = Math.floor(Math.random() * seedPhrase.length);
                }
                setArr([
                  { word: seedPhrase[idx1], originalIndex: idx1 + 1 },
                  { word: seedPhrase[idx2], originalIndex: idx2 + 1 },
                ]);
                // setStep(3);
                onNext()
              }}
            >
              I&apos;ve Saved it
            </button>
          </div>
        </>
    )
}