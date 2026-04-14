export interface Tour {
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  duration?: string;
  startingTime?: string;
  meetPoint?: string;
  additionalInfo?: string[];
  shortDescription: string;
  fullDescription: [string, string, string, string, string, string];
}

export const firstTimeExplorerTour: Tour = {
  name: "First time explorer tour",
  imageSrc: "images/meiji_shrine_gate_00-small.webp",
  imageAlt:
    "One of the gates to the Meiji Jingu shrine in the heart of the Tokyo",
  price: "25 000 ¥",
  duration: "3 to 6 hours",
  startingTime: "10:00",
  meetPoint: "Asakusa station exit 2",
  additionalInfo: [
    "We also offer to pick up at the location of your accommodation for additional fee based on the distance.",
  ],
  shortDescription:
    "First time in Tokyo? We've got you covered. Explore the city's mix of {tradition and modern life} — from {Asakusa} and {Meiji Jingu Shrine} to the energy of {Shibuya Crossing}. The tour is flexible with {small adjustments} based on your preferences, and we share {tips and insights} to help you explore Tokyo with confidence.",
  fullDescription: [
    "First time in Tokyo? Don’t worry—we’ve got you covered. Exploring such a vast and vibrant city can feel overwhelming, but with us it becomes an {easy and exciting} experience.",
    "We’ll guide you through Tokyo’s unique mix of {tradition and modern life}, helping you experience both its calm and its energy in a natural, {stress-free} way.",
    "Visit the historic area of {Asakusa}, experience the peaceful atmosphere of {Meiji Jingu Shrine}, and step into the energy of {Shibuya Crossing}.",
    "Along the way, you’ll also discover local spots and hidden corners that many visitors miss. The tour is flexible and {can be slightly adjusted} to your preferences—for example, swapping certain stops or focusing more on what interests you most.",
    "Beyond just visiting locations, we {share local insights}, cultural context, and {practical tips} that will help you feel more confident exploring Tokyo on your own for the rest of your stay.",
    "This makes the tour not only a great introduction, but also a {useful starting point} for the rest of your time in Tokyo.",
  ],
};

export const advancedTour: Tour = {
  name: "Advanced tour",
  imageSrc: "images/emperors_palace_00-small.webp",
  imageAlt:
    "One of the gates to the Meiji Jingu shrine in the heart of the Tokyo",
  price: "tailored price",
  duration: "flexible",
  startingTime: "flexible",
  meetPoint: "flexible",
  shortDescription:
    "Explore Tokyo {your way} with our {Advanced tour}. This flexible experience lets {you choose} what you’d like to see while exploring the city with a knowledgeable local guide. Popular options include Shibuya Crossing, Meiji Shrine, Odaiba, Asakusa, and Akihabara. Your {guide will help design a personalized route} so you can experience Tokyo’s culture, neighborhoods, and hidden spots in a way that matches your interests.",
  fullDescription: [
    "This flexible tour is designed for you if you want to explore Tokyo at {your own pace} with a local guide. Instead of following a fixed route, you can help {shape the day} and choose the places and experiences that interest you most.",
    "Whether you want to focus on culture, city views, food, or hidden neighborhoods, the tour can be {adapted} to match your travel style. Together we create a {personalized adventure} through one of the world’s most fascinating cities.",
    "Popular stops include famous locations such as {Shibuya Crossing} and the peaceful forest paths surrounding {Meiji Shrine}. Guests who enjoy modern scenery may also choose to visit the waterfront district of {Odaiba}.",
    "Other great options include historic areas like {Asakusa}, or the colorful streets of {Akihabara} known for anime, gaming, and electronics culture. Your guide can recommend locations depending on your interests and the time available.",
    "This tour is ideal for visitors who want the {freedom} to explore Tokyo without being tied to a strict itinerary. Your guide will help you navigate the city, suggest interesting stops, and share local insights along the way.",
    "By the end of the tour you will have experienced Tokyo in a way that feels {personal and authentic}, visiting places that match your interests while discovering parts of the city many travelers miss.",
  ],
};

export const onsenAndNatureTour: Tour = {
  name: "Onsen and nature tour",
  imageSrc: "images/izu_coast_00-small.webp",
  imageAlt:
    "A view of the Izu coast, a popular day trip destination from Tokyo known for its beautiful coastline and hot springs.",
  price: "145 000 ¥",
  duration: "3 days",
  additionalInfo: [
    "We will schedule an online call with you where we discuss all the details including accommodation, meet point and starting time.",
    "As independent tour guides (not a tour agency), we are unable to book or pay for accommodation, transportation, or meals on your behalf. However, we are happy to assist you in arranging these.",
  ],
  shortDescription:
    "Discover the scenic beauty of the {Izu Peninsula} on a relaxing adventure from Tokyo. Visit {coastal spots} like Jogasaki Coast, explore towns such as {Ito City} and {Shuzenji}, and experience nature at {Kawazu Nanadaru Waterfalls}. Along the way you’ll enjoy {hot springs}, {ocean views}, and the peaceful countryside before returning to Tokyo.",
  fullDescription: [
    "Escape the busy streets of Tokyo and discover the {natural beauty} of the {Izu Peninsula} on a relaxing multi-day journey. This tour takes you through {scenic coastal towns}, {mountain landscapes}, and {traditional hot spring} areas that show a different side of Japan.",
    "Along the way you’ll experience peaceful countryside views, ocean cliffs, and charming local towns. It’s the perfect trip for travelers who want to slow down, enjoy nature, and experience Japan’s famous {onsen} culture.",
    "During the trip we explore {coastal} destinations such as Ito City and the dramatic seaside trails of Jogasaki Coast. These areas offer incredible {ocean scenery}, walking paths, and great opportunities for photography.",
    "We also visit beautiful natural spots including {Kawazu Nanadaru Waterfalls}, a series of waterfalls hidden in lush forest valleys. The journey continues through the historic {hot spring town of Shuzenji}, known for its peaceful streets and traditional atmosphere.",
    "Throughout the tour there will be time to relax in {local onsen}, explore {small towns}, and enjoy {regional food}. After experiencing the highlights of the peninsula, we return comfortably back to Tokyo.",
    "This tour is perfect for travelers looking to experience Japan’s {nature}, {hot springs}, and {coastal landscapes} while exploring one of the most beautiful regions near the capital.",
  ],
};

export const tours: [Tour, Tour, Tour] = [
  firstTimeExplorerTour,
  advancedTour,
  onsenAndNatureTour,
];

export type TourDescSegment = {
  readonly text: string;
  readonly bold: boolean;
};

export function parseTourText(text: string): TourDescSegment[] {
  return text.split(/({[^}]+})/).map((segment) => {
    if (segment.startsWith("{") && segment.endsWith("}")) {
      return { text: segment.slice(1, -1), bold: true };
    } else {
      return { text: segment, bold: false };
    }
  });
}
