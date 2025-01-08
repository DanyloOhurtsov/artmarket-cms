import NewCategoryForm from "@/components/forms/new-category-form/new-category.form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      <SheetTrigger asChild={asChild}>{children}</SheetTrigger>
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
        <>
          <NewCategoryForm />
        </>
      </SheetContent>
    </Sheet>
  );
};

export default NewCategorySheet;
