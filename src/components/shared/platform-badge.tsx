import React from "react";
import { cn } from "@/lib/utils";

export type SocialPlatform =
  | "INSTAGRAM"
  | "FACEBOOK"
  | "TIKTOK"
  | "LINKEDIN"
  | "X"
  | "YOUTUBE";

interface PlatformBadgeProps {
  platform: SocialPlatform;
  showIcon?: boolean;
  className?: string;
  size?: "default" | "sm";
}

// Crisp Minimal SVG Icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 4 11.733 16h4.267l-11.733-16z" />
      <path d="m4 20 6.768-6.768m2.464-2.464L20 4" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const platformConfig: Record<
  SocialPlatform,
  { label: string; icon: React.ElementType; className: string }
> = {
  INSTAGRAM: {
    label: "Instagram",
    icon: InstagramIcon,
    className:
      "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  },
  TIKTOK: {
    label: "TikTok",
    icon: TikTokIcon,
    className:
      "bg-slate-900/10 text-slate-800 dark:bg-white/10 dark:text-slate-200 border-slate-900/20 dark:border-white/20",
  },
  LINKEDIN: {
    label: "LinkedIn",
    icon: LinkedinIcon,
    className:
      "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
  },
  FACEBOOK: {
    label: "Facebook",
    icon: FacebookIcon,
    className:
      "bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/20",
  },
  X: {
    label: "X",
    icon: XIcon,
    className:
      "bg-zinc-500/10 text-zinc-800 dark:text-zinc-200 border-zinc-500/20",
  },
  YOUTUBE: {
    label: "YouTube",
    icon: YoutubeIcon,
    className:
      "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
  },
};

export function PlatformBadge({
  platform,
  showIcon = true,
  className,
  size = "default",
}: PlatformBadgeProps) {
  const config = platformConfig[platform];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors select-none",
        size === "sm" ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className={cn(size === "sm" ? "size-3" : "size-3.5")} />}
      <span>{config.label}</span>
    </span>
  );
}
