// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Feature Card
export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  id: string;
}

// Improvement Project
export interface ImprovementProject {
  title: string;
  roi: number;
  cost: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
  description: string;
}

// Contractor
export interface Contractor {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  verified: boolean;
}

// Chat Message
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Onboarding Step
export interface OnboardingStep {
  title: string;
  description: string;
  details: string[];
}

// ROI Improvement
export interface ROIImprovement {
  name: string;
  investment: string;
  estimatedValue: string;
  roi: number;
  timeline: string;
}
