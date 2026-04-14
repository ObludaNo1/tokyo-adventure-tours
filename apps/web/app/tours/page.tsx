import Button from "@/components/button";
import { Header1, Header2, Header3 } from "@/components/headers";
import {
  advancedTour,
  firstTimeExplorerTour,
  onsenAndNatureTour,
  parseTourText,
  Tour,
  tours,
} from "@/data/tours";
import Image from "next/image";
import Link from "next/link";

function TourSection({
  tour: { name, shortDescription, imageSrc, imageAlt, price },
  link,
  index,
}: {
  tour: Tour;
  link: string;
  index: number;
}) {
  return (
    <section
      className={`w-full flex p-4 gap-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="flex flex-1 flex-col gap-4 pb-8">
        <Header2>{name}</Header2>
        <p className="leading-7 text-2xl flex-1 leading-9">
          {parseTourText(shortDescription).map((part) =>
            part.bold ? (
              <strong key={part.text}>{part.text}</strong>
            ) : (
              <span key={part.text}>{part.text}</span>
            ),
          )}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-3xl">Price: {price}</span>
          <Link href={link}>
            <Button>Details</Button>
          </Link>
        </div>
      </div>
      <div className="relative flex-1 aspect-[16/10] overflow-hidden">
        <Image
          src={`/${imageSrc}`}
          alt={imageAlt}
          fill
          className="object-cover object-center octagon-clip"
        />
      </div>
    </section>
  );
}

export default function ToursPage() {
  return (
    <main className="w-full flex flex-1 flex-col p-4 gap-16">
      <div className="flex items-center">
        <Header1>Explore what we have to offer</Header1>
      </div>
      <TourSection
        tour={firstTimeExplorerTour}
        link="/tours/first-time-explorer"
        index={0}
      />
      <TourSection tour={advancedTour} link="/tours/advanced-tour" index={1} />
      <TourSection
        tour={onsenAndNatureTour}
        link="/tours/onsen-and-nature"
        index={2}
      />
    </main>
  );
}
