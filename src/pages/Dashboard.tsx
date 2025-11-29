import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Home,
  TrendingUp,
  MessageSquare,
  LogOut,
  Wrench,
  DollarSign,
  Calendar,
  Zap,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Priority = "high" | "medium" | "low";

type Project = {
  title: string;
  description: string;
  roi: number;
  cost: string;
  minCost: number;
  maxCost: number;
  weeks: number;
  timeframe: string;
  priority: Priority;
};

const PROJECTS: Project[] = [
  {
    title: "Kitchen Remodel",
    description:
      "Modern kitchen upgrade with new cabinets, countertops, and appliances",
    roi: 78,
    cost: "$25,000 - $35,000",
    minCost: 25000,
    maxCost: 35000,
    weeks: 10,
    timeframe: "8–12 weeks",
    priority: "high",
  },
  {
    title: "Bathroom Renovation",
    description: "Full bathroom refresh with new fixtures and tile work",
    roi: 65,
    cost: "$15,000 - $20,000",
    minCost: 15000,
    maxCost: 20000,
    weeks: 5,
    timeframe: "4–6 weeks",
    priority: "medium",
  },
  {
    title: "Energy-Efficient Windows",
    description:
      "Replace old windows with energy-efficient double-pane models",
    roi: 72,
    cost: "$8,000 - $12,000",
    minCost: 8000,
    maxCost: 12000,
    weeks: 3,
    timeframe: "2–3 weeks",
    priority: "medium",
  },
  {
    title: "Landscaping Upgrade",
    description: "Enhanced curb appeal with professional landscaping",
    roi: 85,
    cost: "$5,000 - $8,000",
    minCost: 5000,
    maxCost: 8000,
    weeks: 3,
    timeframe: "2–4 weeks",
    priority: "low",
  },
];

type FilterKey = "all" | "highROI" | "lowCost" | "quickWins";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterKey>("all");

  // ---------- calculated stats ----------
  const avgROI = Math.round(
    PROJECTS.reduce((sum, p) => sum + p.roi, 0) / PROJECTS.length
  );

  const minBudget = PROJECTS.reduce((sum, p) => sum + p.minCost, 0);
  const maxBudget = PROJECTS.reduce((sum, p) => sum + p.maxCost, 0);

  const fastest = PROJECTS.reduce((a, b) => (a.weeks < b.weeks ? a : b));

  const nextBest = useMemo(
    () => PROJECTS.reduce((a, b) => (a.roi > b.roi ? a : b)),
    []
  );

  // ---------- filtering ----------
  const filtered = useMemo(() => {
    if (filter === "highROI") return PROJECTS.filter((p) => p.roi >= 75);
    if (filter === "lowCost") return PROJECTS.filter((p) => p.maxCost <= 10000);
    if (filter === "quickWins") return PROJECTS.filter((p) => p.weeks <= 4);
    return PROJECTS;
  }, [filter]);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto flex justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Niwaas</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/chat")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Expert
            </Button>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto space-y-8 px-4 py-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back to Niwaas! 🏠
          </h1>
          <p className="text-muted-foreground">
            Your smart renovation dashboard
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Average ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{avgROI}%</p>
              <Progress value={avgROI} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                ${minBudget.toLocaleString()} – $
                {maxBudget.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fastest Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{fastest.title}</p>
              <p className="text-muted-foreground">{fastest.timeframe}</p>
            </CardContent>
          </Card>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={16} />
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "highROI" ? "default" : "outline"}
            onClick={() => setFilter("highROI")}
          >
            High ROI
          </Button>
          <Button
            size="sm"
            variant={filter === "lowCost" ? "default" : "outline"}
            onClick={() => setFilter("lowCost")}
          >
            Low Cost
          </Button>
          <Button
            size="sm"
            variant={filter === "quickWins" ? "default" : "outline"}
            onClick={() => setFilter("quickWins")}
          >
            Quick Wins
          </Button>
        </div>

        {/* PROJECTS */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <Card key={p.title}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{p.title}</CardTitle>
                  <Badge className="capitalize">{p.priority}</Badge>
                </div>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="flex gap-1 items-center">
                      <TrendingUp size={16} />
                      ROI
                    </span>
                    <strong>{p.roi}%</strong>
                  </div>
                  <Progress value={p.roi} />
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    {p.cost}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {p.timeframe}
                  </div>
                </div>

                <Button className="w-full" variant="hero">
                  <Wrench className="mr-2 h-4 w-4" />
                  Explore Project
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* NEXT BEST */}
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Zap className="text-primary" />
              Best Next Project
            </CardTitle>
            <CardDescription>Highest ROI recommendation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg font-bold">{nextBest.title}</p>
            <p className="text-sm text-muted-foreground">
              {nextBest.description}
            </p>
            <Button
              className="mt-3"
              variant="outline"
              onClick={() => navigate("/chat")}
            >
              Ask AI about this project
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
