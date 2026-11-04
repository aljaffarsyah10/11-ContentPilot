"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { PlatformBadge } from "@/components/shared/platform-badge";
import { contentTemplates, ContentTemplate } from "@/config/templates";
import { BookOpen, Sparkles, Check } from "lucide-react";

interface TemplatePickerDialogProps {
  onSelect: (template: ContentTemplate) => void;
  triggerButton?: React.ReactNode;
}

export function TemplatePickerDialog({ onSelect, triggerButton }: TemplatePickerDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (tmpl: ContentTemplate) => {
    setSelectedId(tmpl.id);
    onSelect(tmpl);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "cursor-pointer inline-flex items-center gap-1.5",
        })}
      >
        {triggerButton || (
          <>
            <BookOpen className="size-3.5 text-primary" />
            Pilih Template Konten
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-lg">Template Konten Siap Pakai</DialogTitle>
              <DialogDescription className="text-xs">
                Pilih format copywriting terstruktur untuk mempermudah penulisan naskah konten Anda.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
          {contentTemplates.map((template) => {
            const isSelected = selectedId === template.id;

            return (
              <div
                key={template.id}
                onClick={() => handleSelect(template)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:border-primary hover:bg-muted/40 ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <PlatformBadge platform={template.defaultPlatform} />
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {template.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground pt-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-primary font-medium">
                  <span>Gunakan template ini</span>
                  {isSelected ? (
                    <Check className="size-3.5 text-primary" />
                  ) : (
                    <Sparkles className="size-3.5 text-muted-foreground/60" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
