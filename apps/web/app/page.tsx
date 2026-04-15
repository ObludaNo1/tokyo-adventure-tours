import { Header1, Header2, Header3 } from "@/components/headers";
import Image from "next/image";
import Link from "next/link";
import { parseTourText, Tour, tours } from "@/data/tours";
import Button from "@/components/button";
import Contact from "@/components/contact";

function TourCard({
  tour: { name, slug, imageSrc, imageAlt, price, shortDescription },
}: Readonly<{
  tour: Tour;
}>) {
  return (
    <article className="h-full flex flex-col rounded-lg bg-white">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={`/${imageSrc}`}
          alt={imageAlt}
          fill
          className="object-cover object-center octagon-clip"
        />
      </div>
      <div className="p-4 flex flex-1 flex-col">
        <Header2>{name}</Header2>
        <Header3>{price}</Header3>
        <p className="leading-7">
          {parseTourText(shortDescription).map((part) =>
            part.bold ? (
              <strong key={part.text}>{part.text}</strong>
            ) : (
              <span key={part.text}>{part.text}</span>
            ),
          )}
        </p>
        <Link href={`/tours/${slug}`} className="mt-auto pt-4">
          <Button>Details</Button>
        </Link>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <div className="p-4 flex flex-col gap-16">
      <section className="w-full">
        <Header1>Explore what we offer</Header1>
        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/book">
            <Button size="lg">Book a Tour</Button>
          </Link>
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-8 items-center justify-center">
          <div className="relative w-full aspect-square overflow-hidden rounded-lg">
            <Image
              // TODO Why the fuck when I use the small version of this WebP image the image is rotated???
              src="/images/about_us_00.webp"
              alt="David, one of the tour guides, standing at the train station on the Izu peninsula."
              fill
              className="object-cover object-center circle-clip"
            />
          </div>
          <div className="px-12 pt-0 pb-24">
            <Header1>
              Who
              <br />
              we are
            </Header1>
            <p>
              Meet David and Ondřej. We are friends who moved to Japan to
              explore this beautiful country and who are living here in Tokyo.
              We love this country and want to share its most gorgeous spots
              with you.
            </p>
            <div className="mt-12">
              <Link href="/about">
                <Button>Learn more</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
