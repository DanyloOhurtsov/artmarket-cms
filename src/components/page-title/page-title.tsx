"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { ChevronLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import ModalBack from "./components/modal-back";

interface BaseProps {
  title: string;
  description?: string;
  children?: ReactNode;
  isPrevious?: boolean;
  isFormDirty?: boolean;
}

type PageTitleProps =
  | (BaseProps & { isSaveCancelSection?: false; formId?: never }) // Якщо isSaveCancelSection false, formId не потрібен
  | (BaseProps & { isSaveCancelSection: true; formId: string });

const PageTitle = ({
  title,
  description,
  children,
  isPrevious = false,
  isFormDirty = false,
  isSaveCancelSection = false,
  formId,
}: PageTitleProps) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleBack = () => {
    if (isFormDirty) {
      setShowConfirm(true);
    } else {
      router.back();
    }
  };

  const confirmLeave = () => {
    setShowConfirm(false);
    router.back();
  };

  return (
    <div
      className={cn(
        "flex w-full border-b justify-between items-center border-gray-300 p-4 gap-x-8 bg-white",
        description ? "h-28" : "h-20"
      )}
    >
      <div className="flex items-center gap-x-2">
        {isPrevious && (
          <Button
            onClick={handleBack}
            variant={"ghost"}
            className="size-10 flex-1"
          >
            <ChevronLeftIcon />
          </Button>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
      <div className="flex gap-x-2">
        {children}
        {isSaveCancelSection && (
          <div className="flex gap-x-2">
            <Button variant="secondary" onClick={handleBack}>
              Скинути
            </Button>
            <Button type="submit" form={formId}>
              Зберегти
            </Button>
          </div>
        )}
      </div>

      <ModalBack
        title="Ви впевнені, що хочете вийти?"
        description="Ви втратите всі незбережені дані"
        content="Ви впевнені, що хочете вийти? Всі незбережені дані будуть втрачені."
        isOpen={showConfirm}
        onOpenChange={setShowConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmLeave}
      />
    </div>
  );
};

export default PageTitle;
