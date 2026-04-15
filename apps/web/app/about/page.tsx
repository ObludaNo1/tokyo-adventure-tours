import { Header2, Header4, Title } from "@/components/headers";
import Image from "next/image";

function PersonProfile({
  role,
  name,
  description,
  imageSrc,
  imageAlt,
  index,
}: {
  readonly role: string;
  readonly name: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly index: number;
}) {
  return (
    <section
      className={`w-full flex gap-4 lg:gap-24 justify-center flex-col ${index % 2 === 1 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      <div className="relative lg:flex-1 aspect-square overflow-hidden">
        <Image
          src={`/${imageSrc}`}
          alt={imageAlt}
          fill
          className="object-cover object-center circle-clip"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <Header4>{role}</Header4>
        <Header2>{name}</Header2>
        <p className="text-xl leading-8">{description}</p>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="flex flex-col gap-24">
      <Title>Meet the Team</Title>
      <div className="flex flex-col gap-32 lg:gap-16">
        <PersonProfile
          index={0}
          role="Japan culture enthusiast"
          name="David Ťoupalík"
          description="I’ve been fascinated by Japanese culture since childhood, when it all began with Pokémon and anime. That early interest gradually grew into a deeper passion, leading me to study the Japanese language at a language school. After visiting Japan twice as a tourist, taking the step to move here felt like a natural and exciting next chapter in my life."
          imageSrc="images/about_us_00.webp"
          imageAlt="David Ťoupalík, one of the guides at Tokyo Adventure Tours, standing near the Joetsu-Kaigan train station at Izu peninsula with a cloudy sky and residential area in the background."
        />
        <PersonProfile
          index={1}
          role="Explorer"
          name="Ondřej Caha"
          description="For a few years, I wanted to experience life in a different country and step outside my comfort zone. My and David’s vision aligned and we moved here. Since arriving, I’ve been especially drawn to exploring local food and discovering different areas—ranging from famous landmarks to quiet neighborhoods, small nature spots, and streets that feel completely different from anything in the West."
          imageSrc="images/ondrej_caha_00.webp"
          imageAlt="Ondřej Caha, one of the guides at Tokyo Adventure Tours, sitting on a concrete wall outside a hotel at Izu peninsula, holding a pastry and smiling."
        />
      </div>
    </div>
  );
}
