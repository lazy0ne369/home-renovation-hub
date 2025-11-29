import { OnboardingStep, ROIImprovement, Contractor } from "@/types";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: "Basic Information",
    description: "Enter property address, type, and year built",
    details: ["Address", "Property Type (House/Condo/Townhouse)", "Year Built", "Square Footage"]
  },
  {
    title: "Current Condition",
    description: "Assess your property's current state",
    details: ["Overall Condition", "Major Systems Age", "Recent Updates", "Known Issues"]
  },
  {
    title: "Goals & Budget",
    description: "Define what you want to achieve",
    details: ["Improvement Goals", "Budget Range", "Timeline", "Priority Areas"]
  },
  {
    title: "Get Personalized Plan",
    description: "Receive recommendations tailored to your property",
    details: ["AI Analysis", "ROI Projections", "Project Prioritization", "Timeline Estimates"]
  }
];

export const ROI_IMPROVEMENTS: ROIImprovement[] = [
  {
    name: "Kitchen Remodel",
    investment: "$25,000",
    estimatedValue: "$45,000",
    roi: 78,
    timeline: "8-12 weeks"
  },
  {
    name: "Bathroom Renovation",
    investment: "$15,000",
    estimatedValue: "$24,000",
    roi: 65,
    timeline: "4-6 weeks"
  },
  {
    name: "Energy-Efficient Windows",
    investment: "$8,000",
    estimatedValue: "$11,800",
    roi: 72,
    timeline: "2-3 weeks"
  },
  {
    name: "Landscaping Upgrade",
    investment: "$5,000",
    estimatedValue: "$8,500",
    roi: 85,
    timeline: "2-4 weeks"
  }
];

export const CONTRACTORS: Contractor[] = [
  {
    name: "Elite Kitchen Solutions",
    specialty: "Kitchen Remodeling",
    rating: 4.9,
    reviews: 127,
    location: "Downtown",
    phone: "(555) 123-4567",
    verified: true
  },
  {
    name: "Bathroom Experts Inc",
    specialty: "Bathroom Renovation",
    rating: 4.8,
    reviews: 95,
    location: "Westside",
    phone: "(555) 234-5678",
    verified: true
  },
  {
    name: "Green Window Co",
    specialty: "Window Installation",
    rating: 4.7,
    reviews: 63,
    location: "Midtown",
    phone: "(555) 345-6789",
    verified: true
  },
  {
    name: "Landscape Design Pro",
    specialty: "Landscaping",
    rating: 4.6,
    reviews: 89,
    location: "Eastside",
    phone: "(555) 456-7890",
    verified: true
  }
];

export const AI_ASSISTANT_RESPONSES = [
  "That's a great question! Kitchen remodels typically offer the best ROI at 70-80% return on investment.",
  "I'd recommend starting with an energy audit to identify which improvements will save you the most money.",
  "Based on current market trends, bathroom renovations are seeing strong returns, especially with modern fixtures.",
  "Have you considered the seasonal factors? Spring is typically the best time for most renovation projects.",
  "I can help you calculate the ROI for specific improvements based on your local market conditions.",
  "Would you like me to connect you with verified contractors in your area for a free quote?"
];

export const AI_INITIAL_MESSAGE = "Hello! I'm your AI Expert Assistant. I'm here to help you with home improvement questions, ROI analysis, and project planning. What would you like to know?";
