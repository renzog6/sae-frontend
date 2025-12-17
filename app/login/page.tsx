// filepath: sae-frontend/app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { AlertCircle, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      {/* Left Side - Visual / Brand */}
      <div className="relative flex-col hidden w-full h-full p-10 text-white lg:flex bg-zinc-900 dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          {/* Abstract Background Image */}
          <Image
            src="/images/login-bg.jpg"
            alt="Background"
            fill
            priority
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-zinc-900/60" />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <ShieldCheck className="w-6 h-6 mr-2 text-teal-400" />
          Sistema SAE
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "La eficiencia no es solo hacer las cosas bien, es hacer las cosas
              correctas de manera inteligente."
            </p>
            <footer className="text-sm text-zinc-400">
              Equipo de Tecnología
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="mx-auto w-full max-w-[350px] space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Bienvenido de nuevo
            </h1>
            <p className="text-sm text-zinc-500">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="flex items-center p-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@empresa.com"
                autoComplete="email"
                disabled={isLoading}
                {...register("email")}
                className={`h-11 ${
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="#"
                  className="text-xs font-medium text-teal-600 hover:text-teal-700"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  {...register("password")}
                  className={`h-11 pr-10 ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full font-medium text-white transition-all bg-teal-600 h-11 hover:bg-teal-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <p className="px-8 text-sm text-center text-zinc-500">
            Al continuar, aceptas nuestros{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-zinc-900"
            >
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-zinc-900"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
