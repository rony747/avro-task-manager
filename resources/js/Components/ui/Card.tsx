import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}
export default function Card({ className, children }: CardProps) {
  const defaultClass =
    "bg-gradient-to-br  from-fromColor to-toColor to-50% border border-borderColor  rounded-2xl shadow-xl shadow-black/40 md:p-6 p-4";
  const finalClass = className ? `${defaultClass} ${className}` : defaultClass;
  return <div className={finalClass}>{children}</div>;
}
