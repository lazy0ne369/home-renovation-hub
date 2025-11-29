import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "@/types";
import { ROI_IMPROVEMENTS } from "@/constants";

const ROIPredictionsModal = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleViewFullAnalysis = () => {
    onClose();
    navigate("/onboarding");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            ROI Predictions
          </DialogTitle>
          <DialogDescription>
            Data-driven insights showing potential value uplift for each improvement
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {ROI_IMPROVEMENTS.map((improvement, index) => (
            <Card key={index} className="border-l-4 border-l-success">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{improvement.name}</span>
                  <span className="text-success text-lg font-bold">{improvement.roi}% ROI</span>
                </CardTitle>
                <CardDescription>{improvement.timeline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Investment</p>
                    <p className="text-lg font-semibold">{improvement.investment}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Estimated Value</p>
                    <p className="text-lg font-semibold text-success">{improvement.estimatedValue}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Return</p>
                    <p className="text-lg font-semibold">
                      ${(parseInt(improvement.estimatedValue.replace(/[$,]/g, '')) - parseInt(improvement.investment.replace(/[$,]/g, ''))).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">ROI Progress</span>
                    <span className="font-semibold">{improvement.roi}%</span>
                  </div>
                  <Progress value={improvement.roi} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="hero" onClick={handleViewFullAnalysis}>
            View Full Analysis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ROIPredictionsModal;
