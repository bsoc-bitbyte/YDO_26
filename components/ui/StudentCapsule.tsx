interface StudentCapsuleProps {
  className?: string;
}

export default function StudentCapsule({ className = "" }: StudentCapsuleProps) {
  return (
    <p
      style={{ fontFamily: 'var(--font-poppins)' }}
      className={`
        bg-white
        border border-(--color-stroke) 
        rounded-[12px] 
        text-[12px] text-(--color-stroke) 
        px-6 py-1.5 leading-none whitespace-nowrap w-fit
        ${className}
      `}
    >
      for iiitdmj students only
    </p>
  );
}