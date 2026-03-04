import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import Footer from "@/components/Footer";
import NavbarGuest from "@/components/NavbarGuest";
import NavbarUser from "@/components/NavbarUser";
import { useAuth } from "@/contexts/AuthContext";

export default function ContactPage() {
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = "service_p44pf9a";
      const templateId = "template_ds11e3f";
      const publicKey = "AIiHanSod2_kOwaPR";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "abubakr.muhamamd.5785@gmail.com"
      };

      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Email error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {isAuthenticated ? <NavbarUser /> : <NavbarGuest />}

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-linear-to-br from-primary/10 via-secondary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions about GoVista? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-muted-foreground text-sm">support@govista.com</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-muted-foreground text-sm mb-2">+92 300 1234567</p>
                    <p className="text-muted-foreground text-sm">Available 24/7</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                    <p className="text-muted-foreground text-sm mb-2">FAST University</p>
                    <p className="text-muted-foreground text-sm">Lahore, Pakistan</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow h-full">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                    <p className="text-muted-foreground text-sm mb-2">Mon - Fri: 9AM - 6PM</p>
                    <p className="text-muted-foreground text-sm">Sat: 10AM - 4PM</p>
                  </Card>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <Card className="p-8">
                  <h2 className="font-serif text-3xl font-bold text-primary mb-2 text-center">Send Us a Message</h2>
                  <p className="text-muted-foreground text-center mb-8">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <Input
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <Textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        className="resize-none"
                      />
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="px-12 cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">Find Us</h2>
              <Card className="overflow-hidden">
                <div className="w-full h-96 bg-gray-200 relative">
                  <iframe 
                    title="FAST University Lahore Location"
                    width="100%" 
                    height="100%"
                    src="https://maps.google.com/maps?q=FAST%20NUCES%20Lahore%20Block%20B%20Faisal%20Town&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-primary" />
                        <p className="text-sm">Block B, Faisal Town, Lahore, Punjab, Pakistan</p>
                    </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
