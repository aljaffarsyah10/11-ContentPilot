"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Menu, Plus, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/calendar": "Content Calendar",
  "/contents": "Content Management",
  "/contents/new": "Buat Konten Baru",
  "/ideas": "Content Ideas",
  "/ai-generator": "AI Caption Generator",
  "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const { data: session } = useSession();

  // Determine page title
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
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Nav Sheet */}
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "lg:hidden cursor-pointer",
            })}
            aria-label="Buka Menu"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
            <Sidebar onNavigate={() => setOpenMobile(false)} />
          </SheetContent>
        </Sheet>

        <h1 className="text-base font-semibold text-foreground sm:text-lg">
          {currentTitle}
        </h1>
      </div>

      {/* Right: Quick Actions & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/contents/new"
          className={buttonVariants({
            size: "sm",
            className: "hidden sm:inline-flex items-center",
          })}
        >
          <Plus className="size-4 mr-1.5" />
          <span>Buat Konten</span>
        </Link>

        {/* Theme Mode Toggle */}
        <ThemeToggle />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "rounded-full size-8 cursor-pointer p-0",
            })}
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {userInitials || "CP"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none truncate">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="flex items-center w-full px-2 py-1.5 cursor-pointer">
                <User className="size-4 mr-2" />
                <span>Pengaturan Akun</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-1.5 cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="size-4 mr-2" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
