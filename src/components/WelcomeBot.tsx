import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WelcomeBot = () => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card hover:brightness-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-xs">
      <Card className="shadow-card border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              N
            </span>
            Niwas Bot
          </CardTitle>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="font-medium">
            👋 Welcome to <span className="font-bold">Niwas</span>!
          </p>
          <p className="text-muted-foreground">
            I&apos;m here to help you plan your home renovations and choose the
            best projects for your house.
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Explore home page
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // if you want, later you can change this to navigate("/chat")
              }}
            >
              Say hi 👋
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeBot;
