"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterDto } from "@/lib/validation/auth.schema";
import { api } from "@/lib/api/api-client";
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

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterDto) => {
    setIsLoading(true);
    try {
      await api.auth.register({
        name: values.name.trim(),
        email: values.email.toLowerCase().trim(),
        password: values.password,
      });

      toast.success("Registrasi berhasil! Menyiapkan sesi Anda...");

      // Automatically sign in
      const res = await signIn("credentials", {
        email: values.email.toLowerCase().trim(),
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.info("Akun berhasil dibuat. Silakan login.");
        router.push("/login");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Gagal membuat akun. Silakan coba lagi.";
      toast.error(msg);
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
          Buat Akun Baru
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Mulai rencanakan konten media sosial Anda secara cerdas
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-3.5 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground leading-none" htmlFor="name">
              Nama Lengkap
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              disabled={isLoading}
              className="h-9 text-xs sm:text-sm"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[11px] font-medium text-destructive">{errors.name.message}</p>
            )}
          </div>
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
            <label className="text-xs font-semibold text-foreground leading-none" htmlFor="password">
              Kata Sandi
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 8 karakter"
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
                Mendaftarkan Akun...
              </>
            ) : (
              <>
                Daftar Akun Gratis
                <ArrowRight className="ml-1.5 size-3.5" />
              </>
            )}
          </Button>
          <div className="text-center text-xs text-muted-foreground">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80 transition-colors"
            >
              Masuk di sini
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
