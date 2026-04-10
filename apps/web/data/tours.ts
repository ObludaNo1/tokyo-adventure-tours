export type TourDescSegment = { text: string; bold?: boolean };

export interface Tour {
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  duration?: string;
  startingTime?: string;
  meetPoint?: string;
  additionalInfo?: string[];
  shortDescription: TourDescSegment[];
  fullDescription: [
    TourDescSegment[],
    TourDescSegment[],
    TourDescSegment[],
    TourDescSegment[],
    TourDescSegment[],
    TourDescSegment[],
  ];
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
  shortDescription: [
    {
      text: "First time in Tokyo? We've got you covered. Explore the city's mix of tradition and modern life — from",
    },
    { text: "Asakusa", bold: true },
    { text: "and" },
    { text: "Meiji Jingu Shrine", bold: true },
    { text: "to the energy of" },
    { text: "Shibuya Crossing", bold: true },
    {
      text: "The tour is flexible with",
    },
    { text: "small adjustments", bold: true },
    {
      text: "based on your preferences, and we share",
    },
    { text: "tips and insights", bold: true },
    {
      text: "to help you explore Tokyo with confidence.",
    },
  ],
  fullDescription: [
    [
      {
        text: "First time in Tokyo? Don’t worry—we’ve got you covered. Exploring such a vast and vibrant city can feel overwhelming, but with us it becomes an",
      },
      { text: "easy and exciting", bold: true },
      { text: "experience." },
    ],
    [
      { text: "We’ll guide you through Tokyo’s unique mix of" },
      { text: "tradition and modern life", bold: true },
      {
        text: ", helping you experience both its calm and its energy in a natural,",
      },
      { text: "stress-free", bold: true },
      { text: "way." },
    ],
    [
      { text: "Visit the historic area of" },
      { text: "Asakusa", bold: true },
      { text: ", experience the peaceful atmosphere of" },
      { text: "Meiji Jingu Shrine", bold: true },
      { text: ", and step into the energy of" },
      { text: "Shibuya Crossing.", bold: true },
    ],
    [
      {
        text: "Along the way, you’ll also discover local spots and hidden corners that many visitors miss. The tour is flexible and",
      },
      { text: "can be slightly adjusted", bold: true },
      {
        text: "to your preferences—for example, swapping certain stops or focusing more on what interests you most.",
      },
    ],
    [
      { text: "Beyond just visiting locations, we" },
      { text: "share local insights", bold: true },
      { text: ", cultural context, and" },
      { text: "practical tips", bold: true },
      {
        text: "that will help you feel more confident exploring Tokyo on your own for the rest of your stay.",
      },
    ],
    [
      { text: "This makes the tour not only a great introduction, but also a" },
      { text: "useful starting point", bold: true },
      { text: "for the rest of your time in Tokyo." },
    ],
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
  shortDescription: [
    { text: "Explore Tokyo" },
    { text: "your way", bold: true },
    { text: "with our" },
    { text: "Advanced tour", bold: true },
    { text: "This flexible experience lets" },
    { text: "you choose", bold: true },
    {
      text: "what you’d like to see while exploring the city with a knowledgeable local guide. Popular options include Shibuya Crossing, Meiji Shrine, Odaiba, Asakusa, and Akihabara. Your",
    },
    { text: "guide will help design a personalized route", bold: true },
    {
      text: "so you can experience Tokyo’s culture, neighborhoods, and hidden spots in a way that matches your interests.",
    },
  ],
  fullDescription: [
    [
      {
        text: "This flexible tour is designed for you if you want to explore Tokyo at",
      },
      { text: "your own pace", bold: true },
      {
        text: "with a local guide. Instead of following a fixed route, you can help",
      },
      { text: "shape the day", bold: true },
      {
        text: "and choose the places and experiences that interest them most.",
      },
    ],
    [
      {
        text: "Whether you want to focus on culture, city views, food, or hidden neighborhoods, the tour can be",
      },
      { text: "adapted", bold: true },
      { text: "to match your travel style. Together we create a" },
      { text: "personalized adventure", bold: true },
      { text: "through one of the world’s most fascinating cities." },
    ],
    [
      { text: "Popular stops include famous locations such as" },
      { text: "Shibuya Crossing", bold: true },
      { text: "and the peaceful forest paths surrounding" },
      { text: "Meiji Shrine", bold: true },
      {
        text: "Guests who enjoy modern scenery may also choose to visit the waterfront district of",
      },
      { text: "Odaiba", bold: true },
    ],
    [
      { text: "Other great options include historic areas like" },
      { text: "Asakusa", bold: true },
      { text: ", or the colorful streets of" },
      { text: "Akihabara", bold: true },
      {
        text: "known for anime, gaming, and electronics culture. Your guide can recommend locations depending on your interests and the time available.",
      },
    ],
    [
      { text: "This tour is ideal for visitors who want the" },
      { text: "freedom", bold: true },
      {
        text: "to explore Tokyo without being tied to a strict itinerary. Your guide will help you navigate the city, suggest interesting stops, and share local insights along the way.",
      },
    ],
    [
      {
        text: "By the end of the tour you will have experienced Tokyo in a way that feels",
      },
      { text: "personal and authentic", bold: true },
      {
        text: ", visiting places that match your interests while discovering parts of the city many travelers miss.",
      },
    ],
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
  shortDescription: [
    { text: "Discover the scenic beauty of the" },
    { text: "Izu Peninsula", bold: true },
    { text: "on a relaxing adventure from Tokyo. Visit" },
    { text: "coastal spots", bold: true },
    { text: "like Jogasaki Coast, explore towns such as" },
    { text: "Ito City", bold: true },
    { text: "and" },
    { text: "Shuzenji", bold: true },
    { text: "and experience nature at" },
    { text: "Kawazu Nanadaru Waterfalls", bold: true },
    { text: "Along the way you’ll enjoy" },
    { text: "hot springs", bold: true },
    { text: "," },
    { text: "ocean views", bold: true },
    { text: ", and the peaceful countryside before returning to Tokyo." },
  ],
  fullDescription: [
    [
      { text: "Escape the busy streets of Tokyo and discover the" },
      { text: "natural beauty", bold: true },
      { text: "of the" },
      { text: "Izu Peninsula", bold: true },
      { text: "on a relaxing multi-day journey. This tour takes you through" },
      { text: "scenic coastal towns", bold: true },
      { text: "," },
      { text: "mountain landscapes", bold: true },
      { text: ", and" },
      { text: "traditional hot spring", bold: true },
      {
        text: "areas that show a different side of Japan.",
      },
    ],
    [
      {
        text: "Along the way you’ll experience peaceful countryside views, ocean cliffs, and charming local towns. It’s the perfect trip for travelers who want to slow down, enjoy nature, and experience Japan’s famous",
      },
      { text: "onsen", bold: true },
      { text: "culture." },
    ],
    [
      { text: "During the trip we explore" },
      { text: "coastal", bold: true },
      {
        text: "destinations such as Ito City and the dramatic seaside trails of Jogasaki Coast. These areas offer incredible",
      },
      { text: "ocean scenery", bold: true },
      {
        text: ", walking paths, and great opportunities for photography.",
      },
    ],
    [
      { text: "We also visit beautiful natural spots including" },
      { text: "Kawazu Nanadaru Waterfalls", bold: true },
      {
        text: ", a series of waterfalls hidden in lush forest valleys. The journey continues through the historic",
      },
      { text: "hot spring town of Shuzenji", bold: true },
      { text: ", known for its peaceful streets and traditional atmosphere" },
    ],
    [
      { text: "Throughout the tour there will be time to relax in" },
      { text: "local onsen", bold: true },
      { text: ", explore" },
      { text: "small towns", bold: true },
      { text: ", and enjoy" },
      { text: "regional food", bold: true },
      {
        text: "After experiencing the highlights of the peninsula, we return comfortably back to Tokyo.",
      },
    ],
    [
      {
        text: "This tour is perfect for travelers looking to experience Japan’s",
      },
      { text: "nature", bold: true },
      { text: "," },
      { text: "hot springs", bold: true },
      { text: ", and" },
      { text: "coastal landscapes", bold: true },
      {
        text: "while exploring one of the most beautiful regions near the capital.",
      },
    ],
  ],
};

export const tours: [Tour, Tour, Tour] = [
  firstTimeExplorerTour,
  advancedTour,
  onsenAndNatureTour,
];
