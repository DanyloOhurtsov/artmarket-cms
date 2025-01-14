import * as AlertDialogComponent from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ModalBackProps {
  title: string;
  description: string;
  content: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
}
const ModalBack = ({
  title,
  description,
  isOpen,
  content,
  onOpenChange,
  onCancel,
  onConfirm,
}: ModalBackProps) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <>
      <AlertDialogComponent.AlertDialog
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <AlertDialogComponent.AlertDialogContent>
          <AlertDialogComponent.AlertDialogHeader>
            <AlertDialogComponent.AlertDialogTitle>
              {title}
            </AlertDialogComponent.AlertDialogTitle>
            <AlertDialogComponent.AlertDialogDescription>
              {description}
            </AlertDialogComponent.AlertDialogDescription>
          </AlertDialogComponent.AlertDialogHeader>

          <p>{content}</p>

          <AlertDialogComponent.AlertDialogFooter>
            <AlertDialogComponent.AlertDialogCancel asChild>
              <Button onClick={handleCancel} variant={"secondary"}>
                Скасувати
              </Button>
            </AlertDialogComponent.AlertDialogCancel>
            <AlertDialogComponent.AlertDialogAction asChild>
              <Button onClick={handleConfirm} variant={"destructive"}>
                Вийти
              </Button>
            </AlertDialogComponent.AlertDialogAction>
          </AlertDialogComponent.AlertDialogFooter>
        </AlertDialogComponent.AlertDialogContent>
      </AlertDialogComponent.AlertDialog>
    </>
  );
};

export default ModalBack;
