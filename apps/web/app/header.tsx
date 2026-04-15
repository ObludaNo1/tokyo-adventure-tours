"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  readonly href: string;
  readonly text: string;
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

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const textClassName = isHome ? "text-white" : "text-black";
  const navPositioning = isHome ? "absolute inset-x-0 top-0 z-20" : "relative";

  return (
    <header className={`relative ${textClassName}`}>
      <div
        className={`flex items-center justify-between px-6 py-4 ${navPositioning}`}
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
      </div>
      {isHome ? (
        <div className="relative top-0 w-full aspect-[1742/818] min-h-[36rem] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/government_building_night_tokio_view_00.webp"
              alt="A view from the Tokyo government building at night"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-60" />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-white">
              <h1 className="text-7xl text-center">
                Explore Tokyo without fear
              </h1>
              <p className="text-xl text-center mt-4">
                Welcome to the right place where you can explore Tokyo's gems.
              </p>
              <p className="text-xl text-center mt-4">
                With us you do not need to fear getting lost. We have your back!
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
