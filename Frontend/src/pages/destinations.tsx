import { Layout } from "@/components/layout";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllCities, type City } from "@/lib/api/cities";

const ITEMS_PER_PAGE = 9;

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getAllCities,
  });

  const filteredCities = cities?.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterPrice === "all") return true;
    if (filterPrice === "budget") return city.priceStart < 25000;
    if (filterPrice === "mid") return city.priceStart >= 25000 && city.priceStart < 35000;
    if (filterPrice === "luxury") return city.priceStart >= 35000;

    return true;
  }) || [];

  // Reset to page 1 when filters change
  const resetPage = () => setCurrentPage(1);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCities = filteredCities.slice(startIndex, endIndex);

  // Handle search and filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    resetPage();
  };

  const handleFilterChange = (filter: string) => {
    setFilterPrice(filter);
    resetPage();
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-linear-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              Explore Our Destinations
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 mb-8"
            >
              Discover amazing places around the world
            </motion.p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="container mx-auto px-4 mt-8 mb-8">
          <Card className="p-6 shadow-xl bg-white">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 w-full h-11"
                />
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                <Button
                  variant={filterPrice === "all" ? "default" : "outline"}
                  onClick={() => handleFilterChange("all")}
                  className="flex-1 md:flex-none cursor-pointer"
                >
                  All
                </Button>
                <Button
                  variant={filterPrice === "budget" ? "default" : "outline"}
                  onClick={() => handleFilterChange("budget")}
                  className="flex-1 md:flex-none cursor-pointer"
                >
                  Budget
                </Button>
                <Button
                  variant={filterPrice === "mid" ? "default" : "outline"}
                  onClick={() => handleFilterChange("mid")}
                  className="flex-1 md:flex-none cursor-pointer"
                >
                  Mid-Range
                </Button>
                <Button
                  variant={filterPrice === "luxury" ? "default" : "outline"}
                  onClick={() => handleFilterChange("luxury")}
                  className="flex-1 md:flex-none cursor-pointer"
                >
                  Luxury
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Destinations Grid */}
        <section className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : filteredCities.length > 0 ? (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {paginatedCities.map((city, index) => (
                <motion.div
                  key={city._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                        <div className="flex items-center gap-1">
                          <Star className="fill-yellow-400 text-yellow-400" size={16} />
                          <span className="font-semibold">{city.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <MapPin size={16} />
                        <span className="text-sm">{city.country}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {city.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <p className="text-2xl font-bold text-blue-600">
                            PKR {city.priceStart.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {city.reviews} reviews
                        </div>
                      </div>
                      <Link href={`/city/${city._id}`}>
                        <Button className="w-full cursor-pointer">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-2 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="min-w-10 cursor-pointer"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-2 cursor-pointer"
                  >
                    Next
                    <ChevronRight size={20} />
                  </Button>
                </div>
              )}

              {/* Results Info */}
              <div className="text-center mt-8 text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredCities.length)} of {filteredCities.length} destinations
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No destinations found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Chat with our AI assistant to get personalized recommendations
            </p>
            <Link href="/chatbot">
              <Button size="lg" variant="secondary">
                Talk to AI Assistant
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
