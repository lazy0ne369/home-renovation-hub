import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "@/types";
import { ONBOARDING_STEPS } from "@/constants";

const PropertyOnboardingModal = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleStartOnboarding = () => {
    onClose();
    navigate("/onboarding");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            Property Onboarding
          </DialogTitle>
          <DialogDescription>
            Guide your property details through our smart step-by-step process
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {ONBOARDING_STEPS.map((step, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="hero" onClick={handleStartOnboarding}>
            Start Onboarding
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyOnboardingModal;
