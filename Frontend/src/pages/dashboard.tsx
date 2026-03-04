import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Star, MapPin, User, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Using Unsplash placeholder image
const heroImg = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200";

interface City {
  _id: string;
  name: string;
  country: string;
  description: string;
  priceStart: number;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
}

export default function Home() {
  // Fetch top 4 destinations from the database
  const { data: cities = [], isLoading } = useQuery<City[]>({
    queryKey: ["topDestinations"],
    queryFn: async () => {
      const response = await fetch("/api/cities");
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      // Return only top 4 destinations sorted by rating
      return data.sort((a: City, b: City) => b.rating - a.rating).slice(0, 4);
    },
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Beautiful Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Discover the Extraordinary
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light drop-shadow-md text-white/90">
              Curated tours to the world's most breathtaking destinations.
              Book your next adventure with GoVista.
            </p>

            <Link href="/destinations">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 cursor-pointer">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most booked cities, handpicked for their culture, beauty, and unforgettable experiences.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading destinations...</p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No destinations available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cities.map((city) => (
                <div key={city._id}>
                  <Link href={`/city/${city._id}`}>
                    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                      <div className="relative aspect-3/4 overflow-hidden">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <div className="flex items-center gap-2 text-sm mb-2 opacity-90">
                            <MapPin className="h-4 w-4 text-secondary" />
                            {city.country}
                          </div>
                          <h3 className="font-serif text-2xl font-bold mb-1">{city.name}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="h-4 w-4 text-secondary fill-secondary" />
                            <span>{city.rating} ({city.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/destinations">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white cursor-pointer">
                View All Destinations <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Curated Experiences</h3>
              <p className="text-muted-foreground">
                We don't just book trips; we craft experiences. Every tour is handpicked for quality.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Personalized Service</h3>
              <p className="text-muted-foreground">
                Our team contacts you personally to finalize details, ensuring your trip is perfect.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-accent w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">24/7 AI Support</h3>
              <p className="text-muted-foreground">
                Need recommendations? Our AI assistant is always available to help you plan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
