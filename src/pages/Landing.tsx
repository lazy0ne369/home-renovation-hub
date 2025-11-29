import WelcomeBot from "@/components/WelcomeBot";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Home,
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-home.jpg";
import { useAuth } from "@/context/AuthContext";
import PropertyOnboardingModal from "@/components/PropertyOnboardingModal";
import ROIPredictionsModal from "@/components/ROIPredictionsModal";
import ContractorNetworkModal from "@/components/ContractorNetworkModal";
import AIExpertChatModal from "@/components/AIExpertChatModal";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, signOut } = useAuth();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const features = [
    {
      icon: Home,
      title: "Property Onboarding",
      description:
        "Guide your property details through our smart step-by-step process",
      id: "onboarding",
    },
    {
      icon: TrendingUp,
      title: "ROI Predictions",
      description:
        "Data-driven insights showing potential value uplift for each improvement",
      id: "roi",
    },
    {
      icon: Users,
      title: "Contractor Network",
      description:
        "Connect with verified local contractors filtered by specialty and rating",
      id: "contractors",
    },
    {
      icon: MessageSquare,
      title: "AI Expert Chat",
      description:
        "Get instant answers and smart suggestions from our AI-powered assistant",
      id: "chat",
    },
  ];

  const benefits = [
    "Personalized improvement recommendations",
    "Track projects with timeline & budget",
    "Transparent ROI calculations",
    "Verified contractor directory",
    "AI-powered planning assistance",
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Niwaas</span>
          </div>
          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button variant="hero" onClick={() => navigate("/auth")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Smart Home
                <br />
                <span className="text-primary">Improvements</span>
                <br />
                Start Here
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                AI-powered planning with ROI predictions, personalized
                recommendations, and verified contractor connections. Transform
                your property with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="xl"
                  variant="hero"
                  onClick={() => navigate("/onboarding")}
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                >
                  View Demo
                </Button>
              </div>
            </div>
            <div className="animate-slide-up">
              <img
                src={heroImage}
                alt="Beautiful renovated home showcasing quality improvements"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Plan Smart
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful tools to guide your home improvement journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.id}
                className="p-6 hover-lift bg-card border-border cursor-pointer transition-all hover:shadow-lg hover:border-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setOpenModal(feature.id)}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12">
              Why Choose Niwaas?
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                  <span className="text-lg text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of homeowners making smarter improvement decisions
            with AI-powered insights
          </p>
          <Button
            size="xl"
            variant="accent"
            onClick={() => navigate("/onboarding")}
          >
            Start Free Today
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-secondary/50 border-t border-border">
        <div className="container mx-auto">
          {/* Footer Content Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold text-black">Niwaas</span>
              </div>
              <p className="text-sm text-black leading-relaxed mb-4">
                Smart home improvements powered by AI. Make confident renovation
                decisions with data-driven insights.
              </p>
              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    ROI Calculator
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Contractors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    AI Assistant
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a
                    href="mailto:support@niwaas.com"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    support@niwaas.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    +1 (234) 567-8900
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-black hover:text-primary transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black">
              &copy; 2025 Niwaas. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-black hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-black hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-black hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Welcome bot floating bubble */}
      <WelcomeBot />

      {/* Modals */}
      <PropertyOnboardingModal
        isOpen={openModal === "onboarding"}
        onClose={() => setOpenModal(null)}
      />
      <ROIPredictionsModal
        isOpen={openModal === "roi"}
        onClose={() => setOpenModal(null)}
      />
      <ContractorNetworkModal
        isOpen={openModal === "contractors"}
        onClose={() => setOpenModal(null)}
      />
      <AIExpertChatModal
        isOpen={openModal === "chat"}
        onClose={() => setOpenModal(null)}
      />
    </div>
  );
};

export default Landing;
