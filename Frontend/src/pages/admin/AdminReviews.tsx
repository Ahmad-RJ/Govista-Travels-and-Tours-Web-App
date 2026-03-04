import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Star, User, MapPin, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Review } from "@/lib/api/types";

export default function AdminReviews() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterDestination, setFilterDestination] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const response = await fetch("/api/reviews/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
  });

  // -----------------------------
  // Normalize cityId to object
  // -----------------------------
  const normalizeCity = (review: Review) =>
    typeof review.cityId === "string"
      ? null
      : review.cityId;

  // -----------------------------
  // Destination List
  // -----------------------------
  const destinations = Array.from(
    new Set(
      reviews
        ?.map((r) =>
          typeof r.cityId === "string" ? null : r.cityId._id
        )
        .filter(Boolean) || []
    )
  ).map((id) => {
    const review = reviews?.find(
      (r) => typeof r.cityId !== "string" && r.cityId._id === id
    );
    return typeof review?.cityId === "string" ? null : review?.cityId;
  });

  // -----------------------------
  // Filter Reviews
  // -----------------------------
  const filteredReviews =
    reviews?.filter((review) => {
      const cityObj = normalizeCity(review);

      const matchesSearch =
        review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cityObj &&
          cityObj.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRating =
        filterRating === "all" || review.rating === Number(filterRating);

      const matchesDestination =
        filterDestination === "all" ||
        (cityObj && cityObj._id === filterDestination);

      return matchesSearch && matchesRating && matchesDestination;
    }) || [];

  // -----------------------------
  // Pagination
  // -----------------------------
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = filteredReviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = () => setCurrentPage(1);

  // -----------------------------
  // Render Stars
  // -----------------------------
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );

  // -----------------------------
  // Format Date
  // -----------------------------
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // -----------------------------
  // UI Rendering
  // -----------------------------
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reviews & Feedback
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage customer reviews for all destinations
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleFilterChange();
                }}
                className="pl-10"
              />
            </div>

            {/* Rating Filter */}
            <Select
              value={filterRating}
              onValueChange={(value) => {
                setFilterRating(value);
                handleFilterChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                {[5, 4, 3, 2, 1].map((r) => (
                  <SelectItem key={r} value={String(r)}>
                    {r} Stars
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Destination Filter */}
            <Select
              value={filterDestination}
              onValueChange={(value) => {
                setFilterDestination(value);
                handleFilterChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map(
                  (dest) =>
                    dest && (
                      <SelectItem key={dest._id} value={dest._id}>
                        {dest.name}, {dest.country}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Summary */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            All Reviews ({filteredReviews.length})
          </h2>
          {filteredReviews.length > 0 && (
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}–
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredReviews.length)} of{" "}
              {filteredReviews.length}
            </p>
          )}
        </div>

        {/* Reviews List */}
        {isLoading ? (
          <div className="text-center py-12">Loading reviews...</div>
        ) : filteredReviews.length === 0 ? (
          <Card className="p-12 text-center">No reviews found</Card>
        ) : (
          <div className="space-y-4">
            {paginatedReviews.map((review) => {
              const city = normalizeCity(review);
              const user =
                typeof review.userId === "string" ? null : review.userId;

              return (
                <Card
                  key={review._id}
                  className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* City Image */}
                    {city && (
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1">
                      {/* City Name */}
                      {city && (
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={16} className="text-blue-600" />
                          <span className="font-semibold text-lg">
                            {city.name}, {city.country}
                          </span>
                        </div>
                      )}

                      {/* Rating */}
                      <div className="mb-2">{renderStars(review.rating)}</div>

                      {/* Comment */}
                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {/* User */}
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>
                            <span className="font-medium">
                              {review.userName}
                            </span>
                            {user && (
                              <span className="text-gray-400 ml-1">
                                ({user.email})
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
