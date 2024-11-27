"use client";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "You are not signed in",
          description: "You should be signed in to be able to do this",
          action: <ToastAction altText="Goto schedule to undo">OK</ToastAction>,
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
