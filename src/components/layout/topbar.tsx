"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, Plus, User, LogOut, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/calendar": "Kalender Konten",
  "/contents": "Manajemen Konten",
  "/contents/new": "Buat Konten Baru",
  "/ideas": "Backlog Ide Konten",
  "/ai-generator": "AI Caption Studio",
  "/settings": "Pengaturan Akun",
};

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openMobile, setOpenMobile] = useState(false);
  const { data: session } = useSession();

  let currentTitle = "ContentPilot";
  for (const [route, title] of Object.entries(routeTitles)) {
    if (pathname === route || (route !== "/dashboard" && pathname.startsWith(route))) {
      currentTitle = title;
      break;
    }
  }

  const userName = session?.user?.name || "Kreator Konten";
  const userEmail = session?.user?.email || "user@contentpilot.id";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sm:px-6">
      {/* Left: Mobile Toggle & Page Title with subtle accent indicator */}
      <div className="flex items-center gap-3">
        {/* Mobile Nav Sheet */}
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "lg:hidden cursor-pointer size-8",
            })}
            aria-label="Buka Navigasi Mobile"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
            <Sidebar onNavigate={() => setOpenMobile(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2.5">
          <div className="size-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 hidden sm:block shadow-2xs" />
          <h2 className="text-sm font-bold text-foreground tracking-tight sm:text-base">
            {currentTitle}
          </h2>
        </div>
      </div>

      {/* Right: Quick Action, Theme Toggle, & User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Action: Buat Konten */}
        <Link
          href="/contents/new"
          className={buttonVariants({
            size: "sm",
            className: "hidden sm:inline-flex shadow-xs font-semibold h-8 text-xs",
          })}
        >
          <Plus className="size-3.5 mr-1.5" />
          <span>Buat Konten</span>
        </Link>

        {/* Quick Action: AI Generator with gradient */}
        <Link
          href="/ai-generator"
          className={buttonVariants({
            variant: "gradient",
            size: "sm",
            className: "hidden md:inline-flex h-8 text-xs font-semibold shadow-2xs",
          })}
        >
          <Sparkles className="size-3.5 mr-1.5" />
          <span>AI Caption</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            aria-label="Menu Pengguna"
          >
            <Avatar className="size-8 border border-border/80 shadow-2xs">
              <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-accent to-muted text-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 shadow-lg border-border/80 bg-gradient-to-b from-popover to-popover/95">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-foreground">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground truncate">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="cursor-pointer text-xs py-2"
            >
              <User className="mr-2 size-4 text-muted-foreground" />
              <span>Pengaturan Profil</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-xs py-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 size-4" />
              <span>Keluar (Sign Out)</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
