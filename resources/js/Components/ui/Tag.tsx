import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Tag({ children, onClick, className = "" }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 bg-[#2C2C2E] text-white rounded-lg hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
