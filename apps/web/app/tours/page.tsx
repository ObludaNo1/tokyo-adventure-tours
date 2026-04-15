import Button from "@/components/button";
import { Title, Header2 } from "@/components/headers";
import { parseTourText, Tour, tours } from "@/data/tours";
import Image from "next/image";
import Link from "next/link";

function TourSection({
  tour: { name, slug, shortDescription, imageSrc, imageAlt, price },
  index,
}: {
  tour: Tour;
  index: number;
}) {
  return (
    <section
      className={`w-full flex p-4 gap-24 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="flex flex-1 flex-col gap-4 pb-8">
        <Header2>{name}</Header2>
        <p className="leading-7 text-2xl flex-1 leading-9">
          {parseTourText(shortDescription).map((part, partIndex) =>
            part.bold ? (
              <strong key={partIndex}>{part.text}</strong>
            ) : (
              <span key={partIndex}>{part.text}</span>
            ),
          )}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-3xl">Price: {price}</span>
          <Link href={`/tours/${slug}`}>
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
    <div className="flex flex-col gap-16">
      <div className="flex items-center">
        <Title>Explore what we have to offer</Title>
      </div>
      {tours.map((tour, index) => (
        <TourSection key={tour.slug} tour={tour} index={index} />
      ))}
    </div>
  );
}
