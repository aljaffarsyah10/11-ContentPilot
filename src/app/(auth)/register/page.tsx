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
import { Loader2 } from "lucide-react";

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
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Buat Akun Baru</CardTitle>
        <CardDescription>
          Mulai rencanakan konten media sosial Anda secara cerdas
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium leading-none" htmlFor="name">
              Nama Lengkap
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              disabled={isLoading}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
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
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Kata Sandi
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 8 karakter"
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
                Mendaftarkan Akun...
              </>
            ) : (
              "Daftar & Masuk Dashboard"
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center border-t border-border/40 pt-4">
        <p className="text-xs text-muted-foreground">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Masuk di sini
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
