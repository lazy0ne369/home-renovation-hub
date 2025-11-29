import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "@/types";
import { CONTRACTORS } from "@/constants";

const ContractorNetworkModal = ({ isOpen, onClose }: ModalProps) => {
  const navigate = useNavigate();

  const handleViewAllContractors = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Contractor Network
          </DialogTitle>
          <DialogDescription>
            Connect with verified local contractors filtered by specialty and rating
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {CONTRACTORS.map((contractor, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{contractor.name}</CardTitle>
                      {contractor.verified && (
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{contractor.specialty}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{contractor.rating}</span>
                      <span className="text-xs text-muted-foreground">({contractor.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{contractor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{contractor.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="hero" onClick={handleViewAllContractors}>
            View All Contractors
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractorNetworkModal;
