"use client";

import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import { UploadIcon, XIcon } from "lucide-react";

import * as FormComponent from "@/components/ui/form";
import * as AlertDialogComponent from "@/components/ui/alert-dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ErrorToolTip from "./error.tooltip";

interface ImageInputFieldProps<T extends z.ZodTypeAny> {
  schema: T;
  name: string;
  label: string;
  maxLength?: number;
  placeholder: string;
  description?: string;
  type?: "file" | "text";
  showDescription?: boolean;
  setFiles: React.Dispatch<React.SetStateAction<(string | File)[]>>;
}

const ImageInputField = <T extends z.ZodTypeAny>({
  type = "text",
  name,
  label,
  placeholder,
  description,
  maxLength = 10,
  showDescription = false,
  setFiles,
}: ImageInputFieldProps<T>) => {
  const { control } = useFormContext();
  const [images, setImages] = useState<(string | File)[]>([]);
  const [beforeUpload, setBeforeUpload] = useState<string>("");

  const handleAddImage = (value: string | File) => {
    if (images.length < maxLength) {
      setImages((prev) => [...prev, value]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <FormComponent.FormField
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <FormComponent.FormItem>
            <div className="flex justify-between" id="asdflkhjvbspdf">
              <FormComponent.FormLabel>{label}</FormComponent.FormLabel>

              {/**
               * Additional features
               *
               * 1. Add select file button
               * 2. Add image preview
               * 3. Image remove selected button
               */}
            </div>
            <div className="flex items-center">
              <FormComponent.FormControl className="flex-1">
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div className="size-24 relative" key={index}>
                      <div className="size-full relative rounded-md overflow-hidden">
                        <Image
                          src={
                            typeof image === "string"
                              ? image.trim()
                              : URL.createObjectURL(image)
                          }
                          alt="Зображення"
                          className="w-24 h-24 object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                      <Button
                        className="absolute top-0 right-0 px-0 py-0 size-6 rounded-full transform translate-x-1/3 -translate-y-1/3"
                        variant={"secondary"}
                        size={"icon"}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <XIcon className="size-24" />
                      </Button>
                    </div>
                  ))}

                  {images.length < maxLength && (
                    <div className="relative size-24 rounded-md overflow-hidden">
                      <Button
                        className="flex items-center justify-center size-24"
                        variant={"ghost"}
                      >
                        <UploadIcon className="size-6" />
                      </Button>

                      {type === "file" && (
                        <Input
                          {...field}
                          type="file"
                          accept="image/*"
                          className="size-full opacity-0 absolute top-0 left-0 cursor-pointer"
                          placeholder="Оберіть файл"
                          title="Оберіть файл"
                          onChange={(e) => {
                            if (!e.target.files || e.target.files.length < 1)
                              return;
                            const file = e.target.files[0];
                            if (!file.type.startsWith("image/")) {
                              toast.error("Будь ласка, оберіть зображення");
                              return;
                            }
                            handleAddImage(file);
                          }}
                        />
                      )}
                      {type === "text" && (
                        <div>
                          <AlertDialogComponent.AlertDialog>
                            <AlertDialogComponent.AlertDialogTrigger className="absolute top-0 left-0 cursor-pointer size-full" />

                            <AlertDialogComponent.AlertDialogContent>
                              <AlertDialogComponent.AlertDialogHeader>
                                <AlertDialogComponent.AlertDialogTitle>
                                  Введіть URL зображення
                                </AlertDialogComponent.AlertDialogTitle>
                                <AlertDialogComponent.AlertDialogDescription>
                                  Вставте посилання на зображення
                                </AlertDialogComponent.AlertDialogDescription>
                              </AlertDialogComponent.AlertDialogHeader>

                              <Input
                                {...field}
                                type="text"
                                placeholder={placeholder}
                                className="size-full"
                                value={beforeUpload}
                                onChange={(e) =>
                                  setBeforeUpload(e.target.value)
                                }
                              />

                              <AlertDialogComponent.AlertDialogFooter>
                                <AlertDialogComponent.AlertDialogCancel
                                  onClick={() => setBeforeUpload("")}
                                >
                                  Закрити
                                </AlertDialogComponent.AlertDialogCancel>
                                <AlertDialogComponent.AlertDialogAction
                                  type="button"
                                  onClick={() => {
                                    handleAddImage(beforeUpload);
                                    setBeforeUpload("");
                                  }}
                                  disabled={!beforeUpload}
                                >
                                  Зберегти
                                </AlertDialogComponent.AlertDialogAction>
                              </AlertDialogComponent.AlertDialogFooter>
                            </AlertDialogComponent.AlertDialogContent>
                          </AlertDialogComponent.AlertDialog>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </FormComponent.FormControl>

              <ErrorToolTip fieldState={fieldState} />
            </div>

            <FormComponent.FormDescription hidden={!showDescription}>
              {description}
            </FormComponent.FormDescription>
          </FormComponent.FormItem>
        )}
      />
    </>
  );
};

export default ImageInputField;
