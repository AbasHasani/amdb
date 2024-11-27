"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div>
      <p>You did not get any luck this time</p>
      <Button onClick={() => reset()}>Reset</Button>
    </div>
  );
};

export default error;
