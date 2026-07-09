"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        onChange(result.data.url);
      } else {
        setError(result.error || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-accent mb-2">{label}</label>

      {value && (
        <div className="relative w-full h-40 rounded border border-accent/20 overflow-hidden bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-contain" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 text-white rounded-full text-sm flex items-center justify-center hover:bg-red-500 transition"
          >
            &times;
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleUpload}
          className="block w-full text-sm text-accent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-accent/20 file:text-accent file:font-medium hover:file:bg-accent/30 file:cursor-pointer cursor-pointer"
        />
        {uploading && <span className="text-sm text-accent/60 shrink-0">Uploading...</span>}
      </div>

      {value && !uploading && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1.5 text-xs rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50"
          placeholder="Or paste image URL directly"
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
