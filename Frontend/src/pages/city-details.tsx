import { Layout } from "@/components/layout";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, CheckCircle2, ArrowLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Review, City } from "@/lib/api/types";
import { useAuth } from "@/contexts/AuthContext";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  guests: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Must be at least 1 guest",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  notes: z.string().optional(),
});

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

export default function CityDetails() {
  const [match, params] = useRoute("/city/:id");
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch city details from API
  const { data: city, isLoading: cityLoading } = useQuery<City>({
    queryKey: ["city", params?.id],
    queryFn: async () => {
      if (!params?.id) throw new Error("City ID is required");
      const response = await fetch(`/api/cities/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch city details");
      return response.json();
    },
    enabled: !!params?.id,
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["reviews", params?.id],
    queryFn: async () => {
      if (!params?.id) return [];
      const response = await fetch(`/api/reviews/city/${params.id}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      return response.json();
    },
    enabled: !!params?.id,
  });

  const bookingMutation = useMutation({
    mutationFn: async (values: z.infer<typeof bookingSchema>) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityId: params?.id,
          cityName: city?.name,
          name: values.name,
          email: values.email,
          phone: values.phone,
          guests: parseInt(values.guests),
          startDate: values.date,
          notes: values.notes || "",
          userId: null,
        }),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      return response.json();
    },
    onSuccess: () => {
      setIsBooked(true);
      toast({
        title: "Booking Request Received!",
        description: "Our team will contact you shortly to finalize the details.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: "2",
    },
  });

  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const reviewMutation = useMutation({
    mutationFn: async (values: z.infer<typeof reviewSchema>) => {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityId: params?.id,
          userName: user?.username || "Guest User",
          userId: user?._id || null,
          rating: values.rating,
          comment: values.comment,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit review");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", params?.id] });
      reviewForm.reset();
      toast({
        title: "Review Submitted!",
        description: "Thank you for sharing your experience.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Scroll to top when booking is successful
  useEffect(() => {
    if (isBooked) {
      window.scrollTo(0, 0);
    }
  }, [isBooked]);

  function onReviewSubmit(values: z.infer<typeof reviewSchema>) {
    reviewMutation.mutate(values);
  }

  if (cityLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading city details...</p>
        </div>
      </Layout>
    );
  }

  if (!city) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">City Not Found</h1>
          <Link href="/dashboard">
            <Button>Return Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    bookingMutation.mutate(values);
  }

  if (isBooked) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full p-8 text-center border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-8">
                Thank you for choosing GoVista for your trip to {city.name}. 
                We have sent a confirmation email to your inbox. Our team will be in touch within 24 hours to finalize your itinerary.
              </p>
              <Link href="/dashboard">
                <Button className="w-full cursor-pointer">Back to Home</Button>
              </Link>
            </motion.div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={city.image} 
          alt={city.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4 gap-2 pl-0">
              <ArrowLeft className="h-4 w-4" /> Back to Destinations
            </Button>
          </Link>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 text-secondary font-medium mb-2 uppercase tracking-wider">
              <MapPin className="h-5 w-5" /> {city.country}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4">{city.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-bold text-sm">
                From PKR {city.priceStart.toLocaleString()}
              </span>
              <span>5 Days / 4 Nights</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">About this Destination</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {city.description}
              </p>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Tour Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {city.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg border border-accent">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="font-medium text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews from Database */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">Traveler Reviews</h3>

              {/* Add Review Form */}
              <Card className="mb-8 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Share Your Experience</h4>
                  {user && (
                    <div className="mb-4 flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-primary-foreground">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">Reviewing as</p>
                        <p className="text-primary font-bold">{user.username}</p>
                      </div>
                    </div>
                  )}
                  <Form {...reviewForm}>
                    <form onSubmit={reviewForm.handleSubmit(onReviewSubmit)} className="space-y-4">
                      <FormField
                        control={reviewForm.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => field.onChange(star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                    className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                                  >
                                    <Star
                                      className={cn(
                                        "h-8 w-8 transition-colors",
                                        (hoveredStar >= star || field.value >= star)
                                          ? "fill-secondary text-secondary"
                                          : "text-muted-foreground"
                                      )}
                                    />
                                  </button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={reviewForm.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your experience..."
                                className="resize-none h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={reviewMutation.isPending}
                        className="w-full cursor-pointer"
                      >
                        {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Display Reviews */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review._id} className="border-b pb-6 last:border-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground">
                          {review.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-primary">{review.userName}</div>
                          <div className="flex text-secondary">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No reviews yet. Be the first to share your experience!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-none shadow-xl overflow-hidden">
                <div className="bg-primary p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold">Book This Tour</h3>
                  <p className="text-primary-foreground/80 text-sm">No payment required today</p>
                </div>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" data-testid="input-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" data-testid="input-email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555)..." data-testid="input-phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      data-testid="button-date-picker"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="guests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Guests</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" data-testid="input-guests" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Dietary restrictions, accessibility needs, etc." 
                                className="resize-none"
                                data-testid="textarea-notes"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={bookingMutation.isPending}
                        data-testid="button-submit-booking"
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-bold py-6 cursor-pointer"
                      >
                        {bookingMutation.isPending ? "Submitting..." : "Request Booking"}
                      </Button>
                      
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
