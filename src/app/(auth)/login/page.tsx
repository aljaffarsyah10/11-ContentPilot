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

export default function LoginPage() {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Masuk ke Akun</CardTitle>
        <CardDescription>
          Masukkan email dan kata sandi Anda untuk mengakses dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="nama@domain.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none" htmlFor="password">
              Kata Sandi
            </label>
            <span className="text-xs text-muted-foreground">Lupa kata sandi?</span>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>
          Masuk ke Dashboard
        </Link>
      </CardContent>
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

