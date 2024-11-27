"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="text-red-800">
      Error: {error.message}
      <Button onClick={() => {
        reset()
        }}>Reset</Button>
      
    </div>
  );
};

export default Error;
