// filepath: sae-frontend/app/login/page.tsx
"use client";

import { PublicLayout } from "@/components/layouts/public-layout";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Verifica tu email y contraseña.");
      } else {
        const session = await getSession();
        if (session) {
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch {
      setError(
        "Ocurrió un error durante el inicio de sesión. Inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-zinc-900 drop-shadow-sm">
              Sistema SAE
            </h1>
            <p className="mt-2 text-zinc-600">
              Sistema de Administración Empresarial
            </p>
          </div>

          <Card className="w-full transition-all duration-300 border shadow-2xl bg-white/80 border-zinc-200 backdrop-blur-lg rounded-xl hover:shadow-zinc-400/30">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-center text-zinc-900">
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-center text-zinc-600">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {error && (
                  <div className="flex items-center p-3 space-x-2 text-sm text-red-700 border border-red-200 rounded-lg shadow-sm bg-red-50">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <Label htmlFor="email" className="font-medium text-zinc-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="tu@email.com"
                    {...register("email")}
                    className={`border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 transition-colors ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="font-medium text-zinc-700"
                  >
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Tu contraseña"
                      {...register("password")}
                      className={`pr-10 border-zinc-300 focus:border-zinc-500 focus:ring-zinc-500 transition-colors ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors text-zinc-400 hover:text-zinc-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white transition-all duration-300 shadow-md rounded-xl bg-zinc-700 hover:bg-zinc-800 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-2 text-sm text-center text-zinc-600">
            ¿Necesitas ayuda? Contacta al administrador del sistema
          </div>
        </div>

        {/* Animaciones suaves */}
        <style jsx>{`
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </PublicLayout>
  );
}
