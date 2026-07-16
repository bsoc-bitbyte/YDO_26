"use client";

import { useRouter } from "next/navigation";

export default function StepProgress({ currentStep }: { currentStep: number }){
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