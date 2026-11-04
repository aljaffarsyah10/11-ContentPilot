import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Buat Akun Baru</CardTitle>
        <CardDescription>
          Mulai rencanakan konten media sosial Anda secara cerdas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="name">
            Nama Lengkap
          </label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="nama@domain.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Kata Sandi
          </label>
          <Input id="password" type="password" placeholder="Minimal 8 karakter" />
        </div>
        <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>
          Daftar & Masuk Dashboard
        </Link>
      </CardContent>
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

