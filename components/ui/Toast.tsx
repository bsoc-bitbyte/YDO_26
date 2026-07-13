"use client";

import Image from "next/image";
import PrimaryButton from "./PrimaryButton";


interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  title?: string;
  message: string;
  action?: ToastAction;
  onClose: () => void;
}

export default function Toast({
  title = "System Message",
  message,
  action,
  onClose,
}: ToastProps) {
  return (
    // Overlay
    <div className="fixed inset-0 z-20 
    flex items-center justify-center">
      <div
        className="
          w-[344px] h-[327px] bg-white
          border border-(--color-stroke) rounded-[8px]
          flex flex-col overflow-hidden
        "
        style={{ boxShadow: 'var(--shadow-toast)' }}
      >
        <div className="
          bg-(--color-foreground)
          px-4 py-2
          flex items-center
          border-b border-(--color-stroke)
        ">
        
        <div className="flex w-6 justify-start">
            <div className="h-5 w-5 bg-[#F2C14E]"/>
        </div>
        <div className=" flex flex-1 justify-center">
            <span style={{ fontFamily: 'var(--font-prime)' }} className="text-[16px] text-(--color-stroke) text-center leading-relaxed">
            {title}
          </span>
        </div>
          <button
          
            onClick={onClose}
            className="flex w-6 justify-end"
          >
          <Image
            src="/assets/Close.svg"
            alt="Close"
            width={20}
            height={20}
          />  
          </button>
        </div>

        <div className="px-3 py-6 pb-3">
          <p style={{ fontFamily: 'var(--font-prime)' }} className=" text-[16px] text-(--color-stroke) text-center leading-relaxed whitespace-pre-line">
            {message}
          </p>
        </div>

        
        <div className="w-[265px] h-px bg-(--color-stroke) mx-8 mb-4" />

        
        {action && (
        <div className="px-4 py-6 pb-6 flex justify-center">
          <PrimaryButton onClick={action.onClick}>
            {action.label}
          </PrimaryButton>
        </div>
        )}
      </div>
    </div>
  );
}