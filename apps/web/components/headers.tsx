import type { ReactNode } from "react";

export function Header1({ children }: { children: ReactNode }) {
  return <h1 className="text-6xl">{children}</h1>;
}

export function Header2({ children }: { children: ReactNode }) {
  return <h2 className="text-4xl">{children}</h2>;
}

export function Header3({ children }: { children: ReactNode }) {
  return <h3 className="text-2xl">{children}</h3>;
}

export function Header4({ children }: { children: ReactNode }) {
  return <h4 className="text-xl">{children}</h4>;
}
