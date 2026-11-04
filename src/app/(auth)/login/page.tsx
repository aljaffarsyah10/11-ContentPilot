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
import { Loader2 } from "lucide-react";

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
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Masuk ke Akun</CardTitle>
        <CardDescription>
          Masukkan email dan kata sandi Anda untuk mengakses dashboard
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nama@domain.com"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none" htmlFor="password">
                Kata Sandi
              </label>
              <span className="text-xs text-muted-foreground">Lupa kata sandi?</span>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Memproses Masuk...
              </>
            ) : (
              "Masuk ke Dashboard"
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center border-t border-border/40 pt-4">
        <p className="text-xs text-muted-foreground">
          Belum memiliki akun?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
