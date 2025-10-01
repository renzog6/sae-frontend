// filepath: sae-frontend/components/contacts/contact-dialog.tsx
"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form as UIForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchema, type ContactFormData } from "@/lib/validations/contact";
import { ContactType } from "@/types/contact";

export interface ContactDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial?: Partial<ContactFormData>;
  onSave: (data: ContactFormData) => void;
  onDelete?: () => void;
}

export function ContactDialog({ open, onOpenChange, initial, onSave, onDelete }: ContactDialogProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      type: initial?.type ?? ContactType.EMAIL,
      value: "",
      label: "",
      information: "",
      ...initial,
    },
  });

  // Reset form when editing a different contact or when initial changes
  useEffect(() => {
    form.reset({
      type: initial?.type ?? ContactType.EMAIL,
      value: initial?.value ?? "",
      label: initial?.label ?? "",
      information: initial?.information ?? "",
    });
  }, [initial, form]);

  function submit(data: ContactFormData) {
    onSave(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-slate-800">{initial?.value ? "Editar contacto" : "Agregar contacto"}</DialogTitle>
        </DialogHeader>
        <UIForm {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <select className="w-full h-10 px-2 border border-slate-200 rounded text-slate-700" value={field.value} onChange={(e) => field.onChange(e.target.value as ContactType)}>
                      {Object.values(ContactType).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="label" render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiqueta</FormLabel>
                  <FormControl>
                    <Input placeholder="Etiqueta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="value" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="Valor (tel/email/URL)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="information" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Información</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <DialogFooter className="flex justify-between gap-2">
              <div>
                {onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      if (confirm("¿Eliminar este contacto? Esta acción no se puede deshacer.")) {
                        onDelete();
                        onOpenChange(false);
                      }
                    }}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">Guardar</Button>
              </div>
            </DialogFooter>
          </form>
        </UIForm>
      </DialogContent>
    </Dialog>
  );
}
