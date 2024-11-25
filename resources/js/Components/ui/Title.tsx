import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="lg:text-3xl text-2xl font-bold text-white">{children}</h1>
  );
}
