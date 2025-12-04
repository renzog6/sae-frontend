// filepath: sae-frontend/lib/hooks/useAuth.ts

import { useSession, signOut } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthService } from "@/lib/api/auth-service";
import { AuthResponse } from "@/lib/types/core/auth";

export interface UseAuthReturn {
  accessToken: string | null;
  user: AuthResponse["user"] | null;
  status: "authenticated" | "loading" | "unauthenticated";
  isLoading: boolean;
  refreshToken: () => Promise<AuthResponse>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<AuthResponse["user"]>;
}

export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      if (!session?.accessToken) throw new Error("No access token available");
      return AuthService.getProfile();
    },
    enabled: !!session?.accessToken && status === "authenticated",
  });

  if (profileQuery.error) {
    toast.error(
      (profileQuery.error as Error).message || "Error fetching profile"
    );
  }

  const refreshMutation = useMutation({
    mutationFn: async () => {
      if (!session?.refreshToken) throw new Error("Missing refresh token");
      const response = await AuthService.refresh(session.refreshToken);
      queryClient.setQueryData(["auth-profile"], response.user);
      return response;
    },
    onError: (err) => {
      toast.error(err.message || "Error refreshing token");
      signOut({ callbackUrl: "/login" });
    },
    onSuccess: () => toast.success("Token refreshed successfully"),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ callbackUrl: "/login" });
      queryClient.clear();
    },
    onError: (err) => toast.error(err.message || "Error logging out"),
    onSuccess: () => toast.success("Logged out successfully"),
  });

  return {
    accessToken: session?.accessToken ?? null,
    user: profileQuery.data ?? null,
    status,
    isLoading: profileQuery.isLoading || status === "loading",
    refreshToken: async () => refreshMutation.mutateAsync(),
    logout: async () => logoutMutation.mutateAsync(),
    fetchProfile: async () => {
      const data = await profileQuery.refetch();
      return data.data!;
    },
  };
}
