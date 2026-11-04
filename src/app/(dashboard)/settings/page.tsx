"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengaturan profil berhasil diperbarui.");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Pengaturan"
        description="Kelola preferensi akun dan konfigurasi integrasi platform ContentPilot Anda."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Profil Pengguna</CardTitle>
          <CardDescription>Informasi identitas akun dan email login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                Nama Lengkap
              </label>
              <Input
                id="name"
                key={session?.user?.name || "name"}
                defaultValue={session?.user?.name || ""}
                placeholder="Nama Lengkap"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Alamat Email
              </label>
              <Input
                id="email"
                type="email"
                value={session?.user?.email || ""}
                disabled
                className="bg-muted/50"
              />
              <p className="text-[11px] text-muted-foreground">Email terikat pada akun autentikasi Anda.</p>
            </div>
            <Button type="submit" size="sm" className="cursor-pointer">
              Simpan Perubahan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
