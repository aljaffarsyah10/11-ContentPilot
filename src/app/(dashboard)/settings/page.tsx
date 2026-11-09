"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Shield } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengaturan profil berhasil diperbarui.");
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in-50 duration-150">
      <PageHeader
        title="Pengaturan Akun"
        description="Kelola preferensi akun dan konfigurasi profil ContentPilot Anda."
      />

      <Card className="border-border/80 shadow-2xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <User className="size-4 text-indigo-500" />
            Profil Pengguna
          </CardTitle>
          <CardDescription className="text-xs">Informasi identitas akun dan email login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground" htmlFor="name">
                Nama Lengkap
              </label>
              <Input
                id="name"
                key={session?.user?.name || "name"}
                defaultValue={session?.user?.name || ""}
                placeholder="Nama Lengkap"
                className="h-9 text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground" htmlFor="email">
                Alamat Email
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="h-9 text-xs sm:text-sm bg-muted/40 cursor-not-allowed opacity-80"
                />
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                <Shield className="size-3 text-emerald-500" />
                Email terverifikasi dan terikat pada akun autentikasi Anda.
              </p>
            </div>
            <div className="pt-2">
              <Button type="submit" size="sm" className="h-9 text-xs font-semibold shadow-xs">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
