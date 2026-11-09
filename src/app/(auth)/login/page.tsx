"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginDto } from "@/lib/validation/auth.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginDto) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email.toLowerCase().trim(),
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Email atau kata sandi tidak valid.");
      } else {
        toast.success("Berhasil masuk! Mengarahkan ke dashboard...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kendala saat mencoba masuk. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/80 bg-card shadow-[0_4px_20px_0_rgba(0,0,0,0.04)] dark:shadow-none">
      <CardHeader className="space-y-1.5 text-center pb-2">
        <div className="flex justify-center mb-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background shadow-xs">
            <Sparkles className="size-4.5" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-foreground">
          Masuk ke Akun
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Masukkan email dan kata sandi Anda untuk mengakses dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground leading-none" htmlFor="email">
              Alamat Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nama@domain.com"
              disabled={isLoading}
              className="h-9 text-xs sm:text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground leading-none" htmlFor="password">
                Kata Sandi
              </label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              className="h-9 text-xs sm:text-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-[11px] font-medium text-destructive">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-2">
          <Button
            type="submit"
            className="w-full h-9 font-semibold text-xs shadow-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-3.5 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                Masuk ke Workspace
                <ArrowRight className="ml-1.5 size-3.5" />
              </>
            )}
          </Button>
          <div className="text-center text-xs text-muted-foreground">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Daftar sekarang
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
