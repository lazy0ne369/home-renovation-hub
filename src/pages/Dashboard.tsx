import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, TrendingUp, MessageSquare, LogOut, Wrench, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const improvementIdeas = [
    {
      title: "Kitchen Remodel",
      roi: 78,
      cost: "$25,000 - $35,000",
      timeframe: "8-12 weeks",
      priority: "high",
      description: "Modern kitchen upgrade with new cabinets, countertops, and appliances"
    },
    {
      title: "Bathroom Renovation",
      roi: 65,
      cost: "$15,000 - $20,000",
      timeframe: "4-6 weeks",
      priority: "medium",
      description: "Full bathroom refresh with new fixtures and tile work"
    },
    {
      title: "Energy-Efficient Windows",
      roi: 72,
      cost: "$8,000 - $12,000",
      timeframe: "2-3 weeks",
      priority: "medium",
      description: "Replace old windows with energy-efficient double-pane models"
    },
    {
      title: "Landscaping Upgrade",
      roi: 85,
      cost: "$5,000 - $8,000",
      timeframe: "2-4 weeks",
      priority: "low",
      description: "Enhanced curb appeal with professional landscaping"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">HomeImprove AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/chat")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Expert
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-xl text-muted-foreground">
            Here are your personalized home improvement recommendations
          </p>
        </div>

        {/* Property Summary */}
        <Card className="mb-8 border-border hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Your Property
            </CardTitle>
            <CardDescription>123 Main Street, City, State</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                <p className="text-lg font-semibold text-foreground">Single Family</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Year Built</p>
                <p className="text-lg font-semibold text-foreground">1995</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Square Feet</p>
                <p className="text-lg font-semibold text-foreground">2,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Value</p>
                <p className="text-lg font-semibold text-primary">$350,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Improvement Ideas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Personalized Improvement Ideas
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {improvementIdeas.map((idea, index) => (
              <Card 
                key={index} 
                className="border-border hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{idea.title}</CardTitle>
                    <Badge 
                      variant={
                        idea.priority === "high" ? "default" : 
                        idea.priority === "medium" ? "secondary" : "outline"
                      }
                    >
                      {idea.priority} priority
                    </Badge>
                  </div>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        Expected ROI
                      </span>
                      <span className="text-sm font-bold text-success">{idea.roi}%</span>
                    </div>
                    <Progress value={idea.roi} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{idea.cost}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{idea.timeframe}</span>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    <Wrench className="w-4 h-4 mr-2" />
                    Explore Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Need Expert Advice?</h3>
            <p className="text-lg mb-6 opacity-90">
              Chat with our AI expert to get personalized recommendations and answers
            </p>
            <Button 
              size="lg" 
              variant="accent"
              onClick={() => navigate("/chat")}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
