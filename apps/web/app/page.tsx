import type { ReactNode } from "react";
import { Header1, Header2, Header3, Header4 } from "@/components/headers";
import Image from "next/image";
import Link from "next/link";
import {
  advancedTour,
  firstTimeExplorerTour,
  onsenAndNatureTour,
  Tour,
} from "@/data/tours";
import Button from "@/components/button";

function TourCard({
  tour: { name, imageSrc, imageAlt, price, shortDescription },
  link,
}: Readonly<{
  tour: Tour;
  link: string;
}>) {
  return (
    <div>
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={`/${imageSrc}`}
          alt={imageAlt}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-4">
        <Header2>{name}</Header2>
        <Header3>{price}</Header3>
        <p>
          {shortDescription.map((part) =>
            part.bold ? (
              <strong key={part.text}>{part.text}</strong>
            ) : (
              <span key={part.text}> {part.text} </span>
            ),
          )}
        </p>
        <Link href={link}>
          <Button>Details</Button>
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full flex-1">
      <section className="relative w-full aspect-[1742/818] -z-10">
        <div className="absolute inset-0 ">
          <Image
            src="/images/government_building_night_tokio_view_00.webp"
            alt="A view from the Tokyo government building at night"
            fill
            className="absolute inset-0 object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 pt-16 z-0">
          <div className="text-white">
            <h1 className="text-7xl text-center">Explore Tokyo without fear</h1>
            <p className="text-xl text-center mt-4">
              Welcome to the right place where you can explore Tokyo's gems.
            </p>
            <p className="text-xl text-center mt-4">
              With us you do not need to fear getting lost. We have your back!
            </p>
          </div>
        </div>
      </section>

      {/* Just a wrapper for padding */}
      <div className="p-4">
        <section className="w-full">
          <Header1>Explore what we offer</Header1>
          <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TourCard
              tour={firstTimeExplorerTour}
              link="tours/first-time-explorer"
            />
            <TourCard tour={advancedTour} link="tours/advanced-tour" />
            <TourCard tour={onsenAndNatureTour} link="tours/onsen-and-nature" />
          </div>
        </section>
      </div>
    </main>
  );
}
