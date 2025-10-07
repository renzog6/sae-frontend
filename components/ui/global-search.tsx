// filepath: sae-frontend/components/ui/global-search.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mainMenu } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // ⌨️ Ctrl + K / Cmd + K abre/cierra el buscador
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* 🔍 Input visible en el header */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-laurel-400" />
        <input
          type="text"
          placeholder="Buscar...Ctrl + K"
          onFocus={() => setOpen(true)}
          readOnly
          className="w-64 px-3 py-2 pl-10 text-sm border rounded-md cursor-pointer border-laurel-200 focus:border-laurel-500 bg-background placeholder:text-muted-foreground"
        />
      </div>

      {/* 🧭 Command Palette flotante */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-0 overflow-hidden shadow-lg">
          <DialogTitle className="sr-only">Buscar</DialogTitle>
          <Command>
            <CommandInput placeholder="Buscar sección..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup heading="Navegación principal">
                {mainMenu.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => handleSelect(item.href)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
