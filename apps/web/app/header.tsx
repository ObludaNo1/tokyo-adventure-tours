"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  href: string;
  text: string;
}

function NavigationItem(props: NavigationItemProps) {
  return (
    <Link
      href={props.href}
      className="px-4 py-2 hover:text-bold transition-colors"
    >
      {props.text}
    </Link>
  );
}

export { NavigationItem };
export type { NavigationItemProps };

export default function Header() {
  // TODO this logic should be handled by main page and header should only receive
  // a colour or should contain hero image as parameter as well. Logic for hero image
  // and header colour should be solved at one place.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const textClassName = isHome ? "text-white" : "text-black";

  return (
    <header
      className={`absolute w-full flex items-center justify-between px-6 py-4 ${textClassName}`}
    >
      <Link href="/" className="text-xl transition-colors">
        Tokyo Adventure Tours
      </Link>
      <nav className="flex gap-1">
        <NavigationItem href="/tours" text="Tours" />
        <NavigationItem href="/book" text="Book a tour" />
        <NavigationItem href="/about" text="About us" />
        <NavigationItem href="/gallery" text="Gallery" />
        <NavigationItem href="/contact-us" text="Contact us" />
      </nav>
    </header>
  );
}
