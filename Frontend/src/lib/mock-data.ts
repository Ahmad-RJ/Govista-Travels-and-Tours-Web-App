// Using Unsplash placeholder images
const parisImg = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800";
const tokyoImg = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800";
const nycImg = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800";
const cairoImg = "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800";

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  priceStart: number;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
}

export const cities: City[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "Experience the romance of the City of Light. From the Eiffel Tower to the Louvre, Paris offers an unforgettable blend of history, art, and culture. Walk along the Seine, enjoy a croissant in a sidewalk cafe, and immerse yourself in the fashion capital of the world.",
    priceStart: 1200,
    image: parisImg,
    rating: 4.8,
    reviews: 124,
    features: ["Eiffel Tower Tour", "Louvre Museum Entry", "Seine River Cruise", "Montmartre Walk"]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "Dive into the neon-lit streets of Tokyo, where tradition meets the future. Visit ancient temples in Asakusa, cross the famous Shibuya Crossing, and explore the vibrant districts of Shinjuku and Harajuku. Taste authentic sushi and experience world-class hospitality.",
    priceStart: 1500,
    image: tokyoImg,
    rating: 4.9,
    reviews: 89,
    features: ["Shibuya Crossing", "Senso-ji Temple", "TeamLab Planets", "Tsukiji Fish Market"]
  },
  {
    id: "nyc",
    name: "New York City",
    country: "USA",
    description: "The city that never sleeps awaits. Walk across the Brooklyn Bridge, see a Broadway show, and gaze at the skyline from the Empire State Building. Central Park offers a green escape in the middle of the concrete jungle.",
    priceStart: 1800,
    image: nycImg,
    rating: 4.7,
    reviews: 210,
    features: ["Statue of Liberty", "Central Park Tour", "Empire State Building", "Broadway Show"]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    description: "Step back in time to the land of Pharaohs. Marvel at the Great Pyramids of Giza, the Sphinx, and the treasures of the Egyptian Museum. A cruise on the Nile River completes this historic journey.",
    priceStart: 900,
    image: cairoImg,
    rating: 4.6,
    reviews: 156,
    features: ["Great Pyramids", "The Sphinx", "Egyptian Museum", "Nile River Cruise"]
  }
];

export interface Review {
  id: string;
  user: string;
  cityId: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    user: "Sarah Johnson",
    cityId: "paris",
    rating: 5,
    comment: "Absolutely magical! The booking process was smooth and the team was so helpful.",
    date: "2024-01-15"
  },
  {
    id: "2",
    user: "Mike Chen",
    cityId: "tokyo",
    rating: 5,
    comment: "Tokyo is incredible. GoVista made everything easy. Highly recommend!",
    date: "2024-02-02"
  }
];
