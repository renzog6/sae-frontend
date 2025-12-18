// filepath: sae-frontend/components/layouts/list-page-layout.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ListPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  stats?: ReactNode;
}

export function ListPageLayout({
  title,
  description,
  children,
  stats,
}: ListPageLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {title}
          </h1>
          <p className="text-zinc-500">{description}</p>
        </div>
      </motion.div>

      {/* Optional Stats Section */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {stats}
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
