import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Home, TrendingUp, Users, MessageSquare, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Home,
      title: "Property Onboarding",
      description: "Guide your property details through our smart step-by-step process"
    },
    {
      icon: TrendingUp,
      title: "ROI Predictions",
      description: "Data-driven insights showing potential value uplift for each improvement"
    },
    {
      icon: Users,
      title: "Contractor Network",
      description: "Connect with verified local contractors filtered by specialty and rating"
    },
    {
      icon: MessageSquare,
      title: "AI Expert Chat",
      description: "Get instant answers and smart suggestions from our AI-powered assistant"
    }
  ];

  const benefits = [
    "Personalized improvement recommendations",
    "Track projects with timeline & budget",
    "Transparent ROI calculations",
    "Verified contractor directory",
    "AI-powered planning assistance"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">HomeImprove AI</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button variant="hero" onClick={() => navigate("/auth")}>
              Get Started
            </Button>
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
                AI-powered planning with ROI predictions, personalized recommendations, 
                and verified contractor connections. Transform your property with confidence.
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
                key={index} 
                className="p-6 hover-lift bg-card border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
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
              Why Choose HomeImprove AI?
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
            Join thousands of homeowners making smarter improvement decisions with AI-powered insights
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
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 HomeImprove AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
