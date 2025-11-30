
"use client";

import { useState, useCallback } from "react";
import { Upload, X, Music, Image as ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept: string;
  type: "audio" | "image";
  onFileSelect: (file: File | null) => void;
}

export function FileUpload({ label, accept, type, onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFile = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    onFileSelect(selectedFile);

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Create preview for images
    if (type === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [onFileSelect, type]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  const removeFile = useCallback(() => {
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    onFileSelect(null);
  }, [onFileSelect]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer group",
            isDragging
              ? "border-[var(--neon-blue)] bg-[var(--neon-blue)]/5"
              : "border-border hover:border-[var(--neon-blue)]/50 hover:bg-muted/50"
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-[var(--neon-blue)]/10 transition-colors">
              {type === "audio" ? (
                <Music className="w-6 h-6 text-muted-foreground group-hover:text-[var(--neon-blue)] transition-colors" />
              ) : (
                <ImageIcon className="w-6 h-6 text-muted-foreground group-hover:text-[var(--neon-blue)] transition-colors" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop your file here or <span className="text-[var(--neon-blue)]">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {type === "audio" ? "MP3, WAV, FLAC (max 200MB)" : "JPG, PNG (min 3000x3000px)"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-start gap-4">
            {type === "image" && preview ? (
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                <Music className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {uploadProgress < 100 ? (
                <div className="mt-3">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-1.5 text-green-500">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-medium">Upload complete</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
