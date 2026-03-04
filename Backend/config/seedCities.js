import { City } from "../models/City.js";

export const pakistaniCities = [
  {
    name: "Islamabad",
    country: "Pakistan",
    description: "The capital city of Pakistan, known for its modern architecture, lush greenery, and the iconic Faisal Mosque. A planned city with wide roads and beautiful landscapes.",
    priceStart: 25000,
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    rating: 4.5,
    reviews: 1250,
    features: ["Faisal Mosque", "Daman-e-Koh", "Pakistan Monument", "Margalla Hills", "Modern Infrastructure"]
  },
  {
    name: "Lahore",
    country: "Pakistan",
    description: "The heart of Pakistan, famous for its rich Mughal heritage, vibrant food culture, Badshahi Mosque, and the historic Lahore Fort. A city where tradition meets modernity.",
    priceStart: 22000,
    image: "https://images.unsplash.com/photo-1586339277861-8d11049daf88?w=800",
    rating: 4.7,
    reviews: 2100,
    features: ["Badshahi Mosque", "Lahore Fort", "Food Street", "Shalimar Gardens", "Historical Sites"]
  },
  {
    name: "Karachi",
    country: "Pakistan",
    description: "Pakistan's largest city and economic hub, offering beautiful beaches, diverse culture, historic sites like Quaid's Mausoleum, and vibrant markets. The city that never sleeps.",
    priceStart: 28000,
    image: "https://images.unsplash.com/photo-1599222675523-31a0eeeb8055?w=800",
    rating: 4.3,
    reviews: 1800,
    features: ["Clifton Beach", "Quaid's Mausoleum", "Mohatta Palace", "Port Grand", "Shopping Malls"]
  },
  {
    name: "Hunza Valley",
    country: "Pakistan",
    description: "A breathtaking mountain valley in Gilgit-Baltistan, famous for stunning landscapes, ancient forts, apricot blossoms, and hospitable people. Paradise on Earth.",
    priceStart: 35000,
    image: "https://images.unsplash.com/photo-1583425423320-2386622cd2e4?w=800",
    rating: 4.9,
    reviews: 950,
    features: ["Attabad Lake", "Baltit Fort", "Karimabad", "Cherry Blossoms", "Mountain Views"]
  },
  {
    name: "Murree",
    country: "Pakistan",
    description: "A popular hill station in the Pir Panjal Range, known for its pleasant weather, colonial architecture, lush pine forests, and Mall Road shopping experience.",
    priceStart: 18000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.2,
    reviews: 1600,
    features: ["Mall Road", "Patriata Chair Lift", "Pine Forests", "Cool Weather", "Colonial Buildings"]
  },
  {
    name: "Skardu",
    country: "Pakistan",
    description: "Gateway to some of the world's highest peaks including K2, featuring pristine lakes, dramatic landscapes, and adventure tourism. A haven for mountaineers and nature lovers.",
    priceStart: 40000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.8,
    reviews: 780,
    features: ["Shangrila Resort", "Deosai Plains", "Satpara Lake", "K2 Base Camp", "Adventure Sports"]
  },
  {
    name: "Swat Valley",
    country: "Pakistan",
    description: "Known as the Switzerland of Pakistan, featuring emerald valleys, crystal-clear rivers, Buddhist heritage sites, and snow-capped peaks. A perfect blend of nature and history.",
    priceStart: 30000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.6,
    reviews: 1100,
    features: ["Malam Jabba", "Mingora", "Buddhist Stupas", "River Swat", "Ski Resort"]
  },
  {
    name: "Naran Kaghan",
    country: "Pakistan",
    description: "A scenic valley in Mansehra District, famous for Lake Saif-ul-Malook, Babusar Top, lush green meadows, and stunning mountain views. Perfect summer destination.",
    priceStart: 32000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.7,
    reviews: 1400,
    features: ["Lake Saif-ul-Malook", "Babusar Top", "Lulusar Lake", "Hiking Trails", "Green Meadows"]
  },
  {
    name: "Peshawar",
    country: "Pakistan",
    description: "One of the oldest cities in South Asia with rich Pashtun culture, historic bazaars, Qissa Khwani Bazaar, and delicious traditional cuisine. Gateway to the Khyber Pass.",
    priceStart: 20000,
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    rating: 4.4,
    reviews: 890,
    features: ["Qissa Khwani Bazaar", "Peshawar Museum", "Bala Hisar Fort", "Traditional Food", "Historic Sites"]
  },
  {
    name: "Multan",
    country: "Pakistan",
    description: "The City of Saints, known for beautiful Sufi shrines, handmade crafts, delicious mangoes, and ancient history dating back thousands of years. A spiritual and cultural hub.",
    priceStart: 19000,
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    rating: 4.3,
    reviews: 720,
    features: ["Sufi Shrines", "Multan Fort", "Handmade Crafts", "Mangoes", "Ancient History"]
  },
  {
    name: "Fairy Meadows",
    country: "Pakistan",
    description: "A grassland near Nanga Parbat, offering spectacular views of the ninth highest mountain in the world. Accessible by jeep and hiking, a true adventurer's paradise.",
    priceStart: 45000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.9,
    reviews: 650,
    features: ["Nanga Parbat View", "Hiking", "Camping", "Alpine Meadows", "Star Gazing"]
  },
  {
    name: "Mohenjo-daro",
    country: "Pakistan",
    description: "An ancient Indus Valley Civilization archaeological site, dating back to 2500 BCE. UNESCO World Heritage Site showcasing advanced urban planning and engineering.",
    priceStart: 15000,
    image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800",
    rating: 4.5,
    reviews: 580,
    features: ["Ancient Ruins", "UNESCO Site", "Museum", "Historical Significance", "Archaeological Tours"]
  }
];

export async function seedPakistaniCities() {
  try {
    console.log("Checking existing cities...");
    const existingCount = await City.countDocuments();

    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} cities. Skipping seed.`);
      return;
    }

    console.log("Seeding Pakistani cities...");
    const cities = await City.insertMany(pakistaniCities);
    console.log(`Successfully seeded ${cities.length} Pakistani cities!`);
    return cities;
  } catch (error) {
    console.error("Error seeding cities:", error);
    throw error;
  }
}
