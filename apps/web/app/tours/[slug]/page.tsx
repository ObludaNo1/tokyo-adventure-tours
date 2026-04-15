import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/button";
import { Title } from "@/components/headers";
import { getTourBySlug, parseTourText, tours } from "@/data/tours";

type TourPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found | Tokyo Adventure Tours",
      description: "The requested tour does not exist.",
    };
  }

  return {
    title: `${tour.name} | Tokyo Adventure Tours`,
    description: tour.shortDescription.replaceAll(/[{}]/g, ""),
  };
}

function TourSection({
  index,
  imageSrc,
  imageAlt,
  children,
}: {
  index: number;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`w-full flex p-4 gap-24 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className="flex-1">{children}</div>
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

export default async function TourDetailPage({ params }: TourPageProps) {
  // Is it ok to await here??
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center">
        <Title>{tour.name}</Title>
      </div>
      <TourSection index={0} imageSrc={tour.imageSrc} imageAlt={tour.imageAlt}>
        <div className="flex flex-col p-4 text-2xl h-full leading-10">
          <div className="flex-1">
            <p>
              {tour.duration && (
                <>
                  <strong>Duration:</strong> {tour.duration}
                </>
              )}
            </p>
            <p>
              {tour.startingTime && (
                <>
                  <strong>Starting Time:</strong> {tour.startingTime}
                </>
              )}
            </p>
            <p className="mb-4">
              {tour.meetPoint && (
                <>
                  <strong>Meet Point:</strong> {tour.meetPoint}
                </>
              )}
            </p>
            {tour.additionalInfo && (
              <>
                {tour.additionalInfo.map((info, index) => (
                  <p key={index}>{info}</p>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-3xl">Price: {tour.price}</span>
            <Link href="/book">
              <Button>Book</Button>
            </Link>
          </div>
        </div>
      </TourSection>
      {[0, 1, 2].map((index) => (
        <TourSection
          key={index}
          index={index + 1}
          imageSrc={tour.imageSrc}
          imageAlt={tour.imageAlt}
        >
          <div className="flex flex-col h-full gap-4 p-4 justify-center text-2xl leading-10">
            <p>
              {parseTourText(tour.fullDescription[index * 2]).map(
                (part, partIndex) =>
                  part.bold ? (
                    <strong key={partIndex}>{part.text}</strong>
                  ) : (
                    <span key={partIndex}>{part.text}</span>
                  ),
              )}
            </p>
            <p>
              {parseTourText(tour.fullDescription[index * 2 + 1]).map(
                (part, partIndex) =>
                  part.bold ? (
                    <strong key={partIndex}>{part.text}</strong>
                  ) : (
                    <span key={partIndex}>{part.text}</span>
                  ),
              )}
            </p>
          </div>
        </TourSection>
      ))}
      <div className="flex justify-center">
        <Link href="/book">
          <Button size="lg">Book the tour</Button>
        </Link>
      </div>
    </div>
  );
}
