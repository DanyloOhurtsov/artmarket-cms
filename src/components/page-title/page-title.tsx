"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import ModalBack from "./components/modal-back";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
  isPrevios?: boolean;
  isFormDirty?: boolean;
  className?: string;
  isSticky?: boolean;
}

const PageTitle = ({
  title,
  description,
  children,
  isPrevios = false,
  isFormDirty = false,
  className,
  isSticky = true,
}: PageTitleProps) => {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const handleBack = () => {
    if (isFormDirty) {
      setShowConfirm(true); // Відкрити модальне вікно
    } else {
      router.back();
    }
  };

  const confirmLeave = () => {
    setShowConfirm(false);
    router.back(); // Повернутися назад
  };

  return (
    <div
      className={cn(
        "flex w-full border-b justify-between items-center border-gray-300 p-4 gap-x-4",
        isSticky && "sticky top-0 bg-white z-10",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        {isPrevios && (
          <Button onClick={handleBack} variant={"ghost"} size={"icon"}>
            <ChevronLeftIcon />
          </Button>
        )}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-slate-600 max-w-[500px]">{description}</p>
        </div>
      </div>
      <div>{children}</div>

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
