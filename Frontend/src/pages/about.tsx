import { Link } from "wouter";
import { Github, Linkedin, Mail, Code, Database, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import NavbarGuest from "@/components/NavbarGuest";
import NavbarUser from "@/components/NavbarUser";
import { useAuth } from "@/contexts/AuthContext";

export default function AboutPage() {
  const { isAuthenticated } = useAuth();

  const developers = [
    {
      name: "Abubakr",
      role: "Full Stack Developer",
      icon: Code,
      description: "Leading the end-to-end development of GoVista, bringing together frontend elegance with robust backend architecture. Passionate about creating seamless user experiences.",
      skills: ["React", "Node.js", "MongoDB", "TypeScript", "UI/UX Design"],
      imagePlaceholder: "/assets/abubakr.jpg",
      github: "https://github.com/muhammadabubakr2005",
      linkedin: "https://www.linkedin.com/in/muhammadabubakr2005/",
      email: "l226559@lhr.nu.edu.pk"
    },
    {
      name: "Ahmad",
      role: "Backend Developer",
      icon: Database,
      description: "Architecting the server-side infrastructure and database design. Ensuring scalability, security, and optimal performance for all backend operations.",
      skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
      imagePlaceholder: "/assets/ahmad.jpg",
      github: "https://github.com/Ahmad-RJ",
      linkedin: "https://www.linkedin.com/in/muhammad-ahmad-raza-13685824a/",
      email: "l226700@lhr.nu.edu.pk"
    },
    {
      name: "Maira",
      role: "Frontend Developer",
      icon: Palette,
      description: "Crafting beautiful and intuitive user interfaces that bring GoVista to life. Focused on responsive design and delightful user interactions.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
      imagePlaceholder: "/assets/maira.jpg",
      github: "https://github.com/Maira-Izhar",
      linkedin: "https://www.linkedin.com/in/maira-izhar-4510a022b/",
      email: "l226626@lhr.nu.edu.pk"
    }
  ];

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
                Meet The Team Behind GoVista
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A passionate team of developers dedicated to revolutionizing travel experiences in Pakistan through innovative technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Developers Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl font-bold text-primary mb-4">Our Development Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Three talented developers working together to bring you the best travel platform for exploring Pakistan
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {developers.map((dev, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Card className="p-6 hover:shadow-xl transition-shadow h-full">
                        {/* Developer Image */}
                        <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <img
                            src={dev.imagePlaceholder}
                            alt={dev.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Developer Info */}
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-2xl mb-1">{dev.name}</h3>
                          <p className="text-primary font-semibold mb-3">{dev.role}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {dev.description}
                          </p>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2 text-center">Key Skills</h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {dev.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center gap-3 pt-4 border-t">
                          <a href={dev.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer">
                            <Github className="h-5 w-5 text-muted-foreground" />
                          </a>
                          <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer">
                            <Linkedin className="h-5 w-5 text-muted-foreground" />
                          </a>
                          <a href={`mailto:${dev.email}`} className="p-2 hover:bg-primary/10 rounded-full transition-colors cursor-pointer">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
                We're building GoVista to make travel in Pakistan more accessible, enjoyable, and memorable.
                By combining cutting-edge technology with local expertise, we aim to showcase the beauty and
                diversity of Pakistan to travelers from around the world.
              </p>
              <Link href="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 cursor-pointer">
                  Join Us On This Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
