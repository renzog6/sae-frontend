// filepath: sae-frontend/app/employees/[id]/documents/page.tsx

"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEmployeeDetail } from "@/lib/hooks/useEmployees";
import { useDocuments } from "@/lib/hooks/useDocuments";
import { Document } from "@/lib/types/domain/document";
import {
  uploadDocumentSchema,
  type UploadDocumentFormData,
  validateFileSize,
  getFileSizeError,
  formatFileSize as formatFileSizeUtil,
} from "@/lib/validations/document";
import { Upload, Download, Trash2, FileText, Image, File } from "lucide-react";
import { formatDate } from "@/lib/utils/date";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function getFileIcon(mimetype: string) {
  if (mimetype.startsWith("image/")) return Image;
  if (mimetype.includes("pdf")) return FileText;
  return File;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function EmployeeDocumentsPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: session } = useSession();

  const { data: employee, isLoading: employeeLoading } = useEmployeeDetail(id);
  const documentsHooks = useDocuments();
  const { useGetAll, useUpload, useDelete, useDownload } = documentsHooks;
  const { data: documentsData, isLoading: documentsLoading } = useGetAll({
    employeeId: id,
  });
  const uploadMutation = useUpload();
  const deleteMutation = useDelete();
  const downloadMutation = useDownload();

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadForm = useForm<UploadDocumentFormData>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      description: "",
    },
  });

  const documents: Document[] = documentsData?.data ?? [];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const sizeError = getFileSizeError(file);
      setFileSizeError(sizeError);
      setSelectedFile(sizeError ? null : file);
    } else {
      setSelectedFile(null);
      setFileSizeError(null);
    }
  };

  const handleUpload = async (data: UploadDocumentFormData) => {
    if (!selectedFile) return;

    try {
      await uploadMutation.mutateAsync({
        file: selectedFile,
        description: data.description,
        employeeId: id,
      });

      setSelectedFile(null);
      setFileSizeError(null);
      uploadForm.reset();
      setUploadDialogOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDownload = (documentId: number, filename: string) => {
    downloadMutation.mutate(documentId);
  };

  const handleDelete = async (documentId: number) => {
    try {
      await deleteMutation.mutateAsync(documentId);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (employeeLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="w-1/4 h-6 rounded animate-pulse bg-muted"></div>
            <div className="w-1/2 h-4 rounded animate-pulse bg-muted"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 animate-pulse">
              <div className="w-full h-4 rounded bg-muted"></div>
              <div className="w-3/4 h-4 rounded bg-muted"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!employee) {
    return <div>Empleado no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Documentos</CardTitle>
              <CardDescription>
                Gestión de documentos del empleado: {employee.person?.firstName}{" "}
                {employee.person?.lastName}
              </CardDescription>
            </div>
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Documento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Subir Documento</DialogTitle>
                  <DialogDescription>
                    Selecciona un archivo (máximo 10MB) y agrega una descripción
                    (mínimo 3 caracteres).
                  </DialogDescription>
                </DialogHeader>
                <Form {...uploadForm}>
                  <form
                    onSubmit={uploadForm.handleSubmit(handleUpload)}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="file">Archivo</Label>
                      <Input
                        id="file"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,.pdf,.doc,.docx,.txt"
                      />
                      {fileSizeError && (
                        <p className="mt-1 text-sm text-destructive">
                          {fileSizeError}
                        </p>
                      )}
                    </div>
                    <FormField
                      control={uploadForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción del documento (mínimo 3 caracteres)..."
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {selectedFile && (
                      <div className="p-3 rounded-lg bg-muted">
                        <p className="text-sm font-medium">
                          Archivo seleccionado:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedFile.name} (
                          {formatFileSize(selectedFile.size)})
                        </p>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedFile(null);
                          setFileSizeError(null);
                          uploadForm.reset();
                          setUploadDialogOpen(false);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={!selectedFile || uploadMutation.isPending}
                      >
                        {uploadMutation.isPending ? "Subiendo..." : "Subir"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {documentsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center p-4 space-x-4 border rounded-lg animate-pulse"
                >
                  <div className="w-10 h-10 rounded bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-1/4 h-4 rounded bg-muted"></div>
                    <div className="w-1/2 h-3 rounded bg-muted"></div>
                  </div>
                  <div className="w-20 h-8 rounded bg-muted"></div>
                </div>
              ))}
            </div>
          ) : documents.length === 0 ? (
            <div className="py-12 text-center">
              <File className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium text-muted-foreground">
                No hay documentos
              </h3>
              <p className="text-sm text-muted-foreground">
                Sube el primer documento para este empleado.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => {
                const FileIcon = getFileIcon(doc.mimetype);
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 transition-colors border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-4">
                      <FileIcon className="w-10 h-10 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {doc.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(doc.size)} • {doc.mimetype} •{" "}
                          {formatDate(doc.uploadedAt)}
                        </p>
                        {doc.description && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {doc.filename}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(doc.id, doc.filename)}
                        disabled={downloadMutation.isPending}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Eliminar Documento
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro de que quieres eliminar "
                              {doc.filename}"? Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(doc.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
