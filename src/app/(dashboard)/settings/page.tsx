import React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Nama Lengkap
            </label>
            <Input id="name" defaultValue="Demo Creator" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Alamat Email
            </label>
            <Input id="email" type="email" defaultValue="creator@contentpilot.id" disabled />
          </div>
          <Button size="sm">Simpan Perubahan</Button>
        </CardContent>
      </Card>
    </div>
  );
}

