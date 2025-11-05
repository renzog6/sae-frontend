"use client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/toaster";

export default function GlobalError({ error }: { error: Error }) {
  const { toast } = useToast();

  useEffect(() => {
    console.error("Global Error:", error);
    toast({
      variant: "error",
      title: "Unexpected Error",
      description: error.message,
    });
  }, [error, toast]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="mb-4 text-2xl font-bold">An unexpected error occurred</h1>
      <p className="mb-8 text-muted-foreground">{error.message}</p>
      <a href="/" className="text-blue-500 hover:underline">
        Return to Dashboard
      </a>
    </div>
  );
}
