"use client";

interface PrimaryButtonProp{
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function PrimaryButton({children, onClick, disabled = false, className,}:PrimaryButtonProp){
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{ fontFamily: 'var(--font-poppins)' }}
            className={`
                    w-[300px] h-[50px]
                    bg-(--color-primary) border border-(--color-stroke) rounded-[10px]
                    --text-base font-normal text-(--color-stroke)
                    flex items-center justify-center
                    transition-opacity duration-150 hover:opacity-85 disabled:opacity-60
                    ${className}
                `}
            >
            {children}
            </button>
    );
}