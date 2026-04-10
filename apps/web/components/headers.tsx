import type { ReactNode } from "react";

export function Header1({ children }: { children: ReactNode }) {
  return <h1 className="text-6xl pt-18 pb-6">{children}</h1>;
}

export function Header2({ children }: { children: ReactNode }) {
  return <h2 className="text-4xl pt-12 pb-4">{children}</h2>;
}

export function Header3({ children }: { children: ReactNode }) {
  return <h3 className="text-2xl pt-6 pb-2">{children}</h3>;
}

export function Header4({ children }: { children: ReactNode }) {
  return <h4 className="text-xl pt-3 pb-1">{children}</h4>;
}
