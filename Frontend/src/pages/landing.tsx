import { Link } from "wouter";
import { Star, Shield, Clock, Heart, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import NavbarGuest from "@/components/NavbarGuest";
import NavbarUser from "@/components/NavbarUser";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Star,
      title: "Premium Destinations",
      description: "Handpicked locations across Pakistan offering unforgettable experiences"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our priority with verified accommodations and guides"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for a seamless travel experience"
    },
    {
      icon: Heart,
      title: "Personalized Plans",
      description: "Custom travel itineraries designed just for you"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {isAuthenticated ? <NavbarUser /> : <NavbarGuest />}

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" id="home" className="mt-0">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center bg-linear-to-br from-primary/10 via-secondary/5 to-background overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')] bg-cover bg-center opacity-10" />
              <div className="container mx-auto px-4 z-10">
                <motion.div
                  className="max-w-4xl mx-auto text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
                    Discover Pakistan's
                    <span className="text-secondary block">Hidden Gems</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Experience the breathtaking beauty and rich culture of Pakistan with expertly curated travel packages
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth">
                      <a className="cursor-pointer">
                        <Button size="lg" className="text-lg px-8 py-6 cursor-pointer">
                          Start Your Journey
                        </Button>
                      </a>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="font-serif text-4xl font-bold text-primary mb-4">Why Choose GoVista?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    We provide exceptional travel experiences with attention to every detail
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="container mx-auto px-4 text-center">
                <h2 className="font-serif text-4xl font-bold mb-4">Ready to Explore?</h2>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Join thousands of travelers who have discovered Pakistan's beauty with GoVista
                </p>
                <Link href="/auth">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 cursor-pointer">
                    Create Your Account
                  </Button>
                </Link>
              </div>
            </section>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" id="about" className="mt-0">
            <section className="py-20 bg-background min-h-screen">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="font-serif text-5xl font-bold text-primary mb-8 text-center">About GoVista</h1>

                  <div className="prose prose-lg max-w-none">
                    <Card className="p-8 mb-8">
                      <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Story</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Founded with a passion for showcasing Pakistan's incredible diversity, GoVista has been connecting travelers with unforgettable experiences since our inception. We believe that Pakistan is home to some of the world's most stunning landscapes, warmest people, and richest cultural heritage.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        From the snow-capped peaks of the Karakoram to the golden deserts of Sindh, from the lush valleys of Swat to the bustling streets of Lahore - we curate journeys that capture the essence of this remarkable country.
                      </p>
                    </Card>

                    <Card className="p-8 mb-8">
                      <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Mission</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        To make Pakistan's beauty accessible to travelers worldwide while promoting sustainable tourism and supporting local communities. We strive to create meaningful connections between travelers and destinations, ensuring every journey is not just a trip, but a transformative experience.
                      </p>
                    </Card>

                    <Card className="p-8">
                      <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Values</h2>
                      <ul className="space-y-4 text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <Shield className="h-6 w-6 text-primary mt-1 shrink-0" />
                          <div>
                            <strong className="text-foreground">Safety First:</strong> Your security and wellbeing are our top priorities in every aspect of your journey.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Heart className="h-6 w-6 text-primary mt-1 shrink-0" />
                          <div>
                            <strong className="text-foreground">Authentic Experiences:</strong> We focus on genuine cultural immersion and meaningful local interactions.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Globe className="h-6 w-6 text-primary mt-1 shrink-0" />
                          <div>
                            <strong className="text-foreground">Sustainability:</strong> We're committed to responsible tourism that benefits local communities and preserves natural beauty.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Star className="h-6 w-6 text-primary mt-1 shrink-0" />
                          <div>
                            <strong className="text-foreground">Excellence:</strong> We maintain the highest standards in service, accommodation, and experiences.
                          </div>
                        </li>
                      </ul>
                    </Card>
                  </div>

                  <div className="text-center mt-12">
                    <Link href="/auth">
                      <Button size="lg" className="text-lg px-8 py-6 cursor-pointer">
                        Start Your Journey With Us
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" id="contact" className="mt-0">
            <section className="py-20 bg-background min-h-screen">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="font-serif text-5xl font-bold text-primary mb-4 text-center">Get In Touch</h1>
                  <p className="text-center text-muted-foreground mb-12 text-lg">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Email Us</h3>
                          <p className="text-muted-foreground">support@govista.com</p>
                          <p className="text-muted-foreground">info@govista.com</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Call Us</h3>
                          <p className="text-muted-foreground">+92 300 1234567</p>
                          <p className="text-muted-foreground">Available 24/7</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                          <p className="text-muted-foreground">123 Travel Lane</p>
                          <p className="text-muted-foreground">Islamabad, Pakistan</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                          <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                          <p className="text-muted-foreground">Weekend: 10:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-8">
                    <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">Send Us a Message</h2>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <textarea
                          rows={6}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>
                      <div className="text-center">
                        <Button size="lg" className="px-12 cursor-pointer">Send Message</Button>
                      </div>
                    </form>
                  </Card>
                </motion.div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
