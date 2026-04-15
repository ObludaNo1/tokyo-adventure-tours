import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "@/components/button";
import { Title, Header2 } from "@/components/headers";
import { getTourBySlug, parseTourText, Tour, tours } from "@/data/tours";

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
        <Title>Explore what we have to offer</Title>
      </div>
      <TourSection index={0} imageSrc={tour.imageSrc} imageAlt={tour.imageAlt}>
        <div>
          <Header2>{tour.name}</Header2>
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
          <p>
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
      </TourSection>
      {[0, 1, 2].map((index) => (
        <TourSection
          key={index}
          index={index + 1}
          imageSrc={tour.imageSrc}
          imageAlt={tour.imageAlt}
        >
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
