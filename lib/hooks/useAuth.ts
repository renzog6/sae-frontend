// filepath: sae-frontend/lib/hooks/useAuth.ts

import { useSession, signOut } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthService } from "@/lib/api/auth-service";
import { AuthResponse } from "@/lib/types/auth";

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

  // Query para obtener el perfil del usuario
  const profileQuery = useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      if (!session?.accessToken) throw new Error("No hay token de acceso");
      return AuthService.getProfile();
    },
    enabled: !!session?.accessToken && status === "authenticated",
  });

  // Mostrar error si ocurre en la query del perfil
  if (profileQuery.error) {
    toast.error(
      (profileQuery.error as Error).message || "Error al obtener el perfil"
    );
  }

  // Mutación para refrescar el token
  const refreshMutation = useMutation({
    mutationFn: async () => {
      if (!session?.refreshToken) throw new Error("No hay refresh token");
      const response = await AuthService.refresh(session.refreshToken);
      queryClient.setQueryData(["auth-profile"], response.user);
      return response;
    },
    onError: (err) => {
      toast.error(err.message || "Error al refrescar el token");
      signOut({ callbackUrl: "/login" });
    },
    onSuccess: () => {
      toast.success("Token refrescado exitosamente");
    },
  });

  // Mutación para cerrar sesión
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ callbackUrl: "/login" });
      queryClient.clear();
    },
    onError: (err) => {
      toast.error(err.message || "Error al cerrar sesión");
    },
    onSuccess: () => {
      toast.success("Sesión cerrada exitosamente");
    },
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
