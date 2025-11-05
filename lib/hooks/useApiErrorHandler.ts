// filepath: sae-frontend/lib/hooks/useApiErrorHandler.ts
import { useToast } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export function useApiErrorHandler() {
  const { toast } = useToast();
  const router = useRouter();

  function handleApiError(error: any) {
    const status = error?.status || error?.response?.status;

    switch (status) {
      case 400:
        toast({
          variant: "error",
          title: "Bad Request",
          description: "Invalid data sent to the server.",
        });
        break;
      case 401:
        toast({
          variant: "error",
          title: "Unauthorized",
          description: "Your session has expired.",
        });
        router.push("/login");
        break;
      case 403:
        toast({
          variant: "error",
          title: "Access Denied",
          description: "You do not have permission to perform this action.",
        });
        break;
      case 404:
        toast({
          variant: "error",
          title: "Not Found",
          description: "The requested resource could not be found.",
        });
        break;
      case 500:
        toast({
          variant: "error",
          title: "Server Error",
          description: "An unexpected error occurred on the server.",
        });
        break;
      default:
        toast({
          variant: "error",
          title: "Unexpected Error",
          description: error?.message || "Unknown error occurred.",
        });
        console.error("Unhandled API Error:", error);
    }
  }

  return { handleApiError };
}
