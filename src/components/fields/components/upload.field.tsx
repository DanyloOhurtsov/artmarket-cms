"use client";

import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadIcon, XIcon } from "lucide-react";

interface UploadFieldProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  maxFiles?: number;
}

const UploadField = ({ setFiles, maxFiles = 1 }: UploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const removeFile = () => {
    setPreview(null);
    setFiles([]);
    toast.error("Файл видалено");
  };

  console.log("maxFiles", maxFiles);

  return (
    <div className="flex items-center justify-start">
      {preview ? (
        <div className="image-preview relative size-24">
          <div className="size-24 relative">
            <Image
              src={preview}
              alt="Завантажене зображення"
              className="rounded-lg shadow-md w-48 h-48 object-cover"
              fill
            />
          </div>
          <Button
            className="absolute top-0 right-0 px-0 py-0 size-6 rounded-full transform translate-x-1/3 -translate-y-1/3"
            onClick={removeFile}
            variant={"secondary"}
            size={"icon"}
          >
            <XIcon className="size-24" />
          </Button>
        </div>
      ) : (
        <div className="relative size-24 rounded-md overflow-hidden">
          <div className="size-full flex items-center justify-center bg-gray-100">
            <UploadIcon className="size-6" />
          </div>
          <Input
            type="file"
            accept="image/*"
            className="size-full opacity-0 absolute top-0 left-0 cursor-pointer bg-red-50"
            placeholder="Оберіть файл"
            title="Оберіть файл"
            onChange={(e) => {
              if (!e.target.files || e.target.files.length < 1) return;
              const file = e.target.files[0];
              if (!file.type.startsWith("image/")) {
                toast.error("Будь ласка, оберіть зображення");
                return;
              }
              setFiles(() => [file]);
              setPreview(URL.createObjectURL(file));
              toast.success("Файл додано");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadField;
