// filepath: sae-frontend/components/ui/form-dialog.tsx
"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, useReducedMotion } from "framer-motion";

export interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function FormDialog({ open, onOpenChange, title, description, className, children }: FormDialogProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"sm:max-w-lg " + (className ?? "")}
        // Ensure focus ring is visible and consistent
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
