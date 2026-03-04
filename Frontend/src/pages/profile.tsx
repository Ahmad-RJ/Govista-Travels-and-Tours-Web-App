import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Calendar, LogOut, Download, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Booking } from "@/lib/api/types";
import { format } from "date-fns";
import jsPDF from "jspdf";

// Generate PDF for booking
function generateBookingPDF(booking: any) {
  const doc = new jsPDF();

  // Set colors
  const primaryColor = [59, 130, 246]; // Blue
  const secondaryColor = [99, 102, 241]; // Indigo
  const textColor = [31, 41, 55]; // Dark gray

  let yPos = 20;

  // Header - Logo and Title
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("GoVista", 20, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Travel Booking Confirmation", 20, 30);

  yPos = 55;

  // Booking Reference Box
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(20, yPos, 170, 15, 3, 3, 'F');

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Reference:", 25, yPos + 6);
  doc.setFont("helvetica", "normal");
  const bookingId = booking.id ? booking.id.toString().padStart(6, '0') : '000000';
  doc.text(`#BK-${bookingId}`, 25, yPos + 11);

  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const createdDate = booking.createdAt ? format(new Date(booking.createdAt), "MMM dd, yyyy") : "N/A";
  doc.text(`Created: ${createdDate}`, 155, yPos + 10);

  yPos += 25;

  // Traveler Information Section
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TRAVELER INFORMATION", 25, yPos + 5.5);

  yPos += 15;
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  doc.text("Name:", 25, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(booking.name || "N/A", 55, yPos);

  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Email:", 25, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(booking.email || "N/A", 55, yPos);

  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Phone:", 25, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(booking.phone || "N/A", 55, yPos);

  yPos += 15;

  // Trip Details Section
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.rect(20, yPos, 170, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TRIP DETAILS", 25, yPos + 5.5);

  yPos += 15;
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);

  doc.setFont("helvetica", "bold");
  doc.text("Destination:", 25, yPos);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(booking.cityName || "N/A", 55, yPos);

  yPos += 10;
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Start Date:", 25, yPos);
  doc.setFont("helvetica", "normal");
  const startDateText = booking.startDate ? format(new Date(booking.startDate), "PPPP") : "N/A";
  const maxWidth = 130;
  const splitStartDate = doc.splitTextToSize(startDateText, maxWidth);
  doc.text(splitStartDate, 55, yPos);

  yPos += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Number of Guests: ", 25, yPos);
  doc.setFont("helvetica", "normal");
  const guestCount = booking.guests || 1;
  doc.text(`  ${guestCount} ${guestCount === 1 ? 'Guest' : 'Guests'}`, 55, yPos);

  // Special Requests if any
  if (booking.notes) {
    yPos += 15;
    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("SPECIAL REQUESTS", 25, yPos + 5.5);

    yPos += 15;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Split notes into lines
    const splitNotes = doc.splitTextToSize(booking.notes, 160);
    doc.text(splitNotes, 25, yPos);
    yPos += splitNotes.length * 6;
  }

  // Important Information Box
  yPos += 15;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(20, yPos, 170, 25, 3, 3, 'FD');

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text("Important Information:", 25, yPos + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("Our travel team will contact you within 24 hours to finalize your itinerary", 25, yPos + 12);
  doc.text("and discuss accommodation options, activities, and payment details.", 25, yPos + 17);

  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, pageHeight - 35, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Thank you for choosing GoVista!", 105, pageHeight - 23, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Contact Us", 105, pageHeight - 15, { align: "center" });

  doc.setFontSize(8);
  doc.text("Email: support@govista.com  |  Phone: +92 300 1234567", 105, pageHeight - 10, { align: "center" });
  doc.text("Visit: www.govista.com", 105, pageHeight - 6, { align: "center" });

  // Save the PDF
  doc.save(`GoVista-Booking-${booking.id.toString().padStart(6, '0')}.pdf`);
}

export default function Profile() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        console.log("⚠️ No user email available");
        return [];
      }

      console.log("📧 Fetching bookings for:", user.email);

      const response = await fetch(`/api/bookings/email/${user.email}`);
      console.log("📡 Response status:", response.status);
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      console.log("📦 Received bookings:", data);

      // 🔥 FIX: MAP BACKEND FIELDS → FRONTEND EXPECTED FIELDS
      return data.map((b: any) => ({
        ...b,
        userId: localStorage.getItem("userId") || "",
        cityName: b.cityName || b.destination,
        guests: b.numPeople,
        startDate: b.startDate || b.tourDate,
        notes: b.specialRequests,
      }));
    },
    enabled: !!user?.email,
  });

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const getUserInitials = () => {
    if (!user) return "?";

    const displayName = user.name || user.username;
    if (!displayName) return "?";

    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your profile.</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const today = new Date();

  // Upcoming = startDate today or future
  const pendingBookings = bookings.filter((b) => {
    const start = new Date(b.startDate);
    return start >= today;
  });

  // Completed / Past = startDate before today
  const completedBookings = bookings.filter((b) => {
    const start = new Date(b.startDate);
    return start < today;
  });
  console.log("🧾 Completed bookings:", completedBookings);
  console.log("🧾 Pending bookings:", pendingBookings);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="font-serif text-3xl font-bold text-primary">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              {user.phone && <p className="text-muted-foreground text-sm">{user.phone}</p>}
            </div>
            <div className="md:ml-auto flex gap-2">
              <Button variant="destructive" size="sm" onClick={handleLogout} className="cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
              <TabsTrigger value="bookings" className="cursor-pointer">My Bookings ({pendingBookings.length})</TabsTrigger>
              <TabsTrigger value="history" className="cursor-pointer">Travel History ({completedBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Upcoming Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <p className="text-center py-8 text-muted-foreground">Loading bookings...</p>
                  ) : pendingBookings.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>No pending bookings.</p>
                      <Link href="/dashboard">
                        <Button variant="link" className="mt-2 text-secondary cursor-pointer">Browse Destinations</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                              <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-secondary-foreground font-bold">
                                {booking.cityName?.substring(0, 3).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{booking.cityName} Tour</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> {format(new Date(booking.startDate), "PPP")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" /> {booking.guests} Guests
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">
                              Pending
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateBookingPDF(booking)}
                              className="cursor-pointer"
                            >
                              <Download className="h-3 w-3 mr-1" /> Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Past Adventures</CardTitle>
                </CardHeader>
                <CardContent>
                  {completedBookings.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No past trips yet. Time to book your first adventure!</p>
                      <Link href="/dashboard">
                        <Button variant="link" className="mt-2 text-secondary">Browse Destinations</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {completedBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                              <div className="w-full h-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                {booking.cityName?.substring(0, 3).toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{booking.cityName} Tour</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" /> {format(new Date(booking.startDate), "PPP")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                              Completed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
