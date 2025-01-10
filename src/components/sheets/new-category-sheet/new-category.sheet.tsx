import NewCategoryForm from "@/components/forms/new-category-form/new-category.form";
import HoverTooltip from "@/components/hover-tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircleIcon } from "lucide-react";

interface NewCategorySheetProps {
  isOpen: boolean;
  onOpenChange: () => void;
  asChild?: boolean;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

const NewCategorySheet = ({
  children,
  isOpen,
  onOpenChange,
  asChild = false,
  side = "right",
}: NewCategorySheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild={asChild}>
        <Button variant={"ghost"} size={"icon"}>
          <HoverTooltip content="Додати новий елемент" asChild>
            <PlusCircleIcon size={24} />
          </HoverTooltip>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={side}
        className="w-[400px] sm:w-[540px] sm:max-w-full"
      >
        <SheetHeader>
          <SheetTitle>Створити нову категорію</SheetTitle>
          <SheetDescription>
            Заповніть форму, щоб створити нову категорію.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <>
        {children}
        </>
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
