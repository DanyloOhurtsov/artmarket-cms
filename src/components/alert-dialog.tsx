import * as AlertComponent from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "./ui/button";

interface AlertDialogProps {
  children: React.ReactNode;
  content: string;
  label: string;
  buttonLabel: string;
  onSure: () => void;
  buttonVariant?: ButtonProps["variant"];
  buttonType?: ButtonProps["type"];
}

const AlertDialog = ({
  children,
  content,
  label,
  buttonLabel,
  onSure,
  buttonVariant = "destructive",
  buttonType = "button",
}: AlertDialogProps) => {
  return (
    <AlertComponent.AlertDialog>
      <AlertComponent.AlertDialogTrigger asChild>
        {children}
      </AlertComponent.AlertDialogTrigger>

      <AlertComponent.AlertDialogContent>
        <AlertComponent.AlertDialogHeader>
          <AlertComponent.AlertDialogTitle>
            {label}
          </AlertComponent.AlertDialogTitle>
        </AlertComponent.AlertDialogHeader>

        <div>{content}</div>

        <AlertComponent.AlertDialogFooter>
          <AlertComponent.AlertDialogCancel asChild>
            <Button type="button" variant={"secondary"}>
              Скасувати
            </Button>
          </AlertComponent.AlertDialogCancel>
          <Button onClick={onSure} type={buttonType} variant={buttonVariant}>
            {buttonLabel}
          </Button>
        </AlertComponent.AlertDialogFooter>
      </AlertComponent.AlertDialogContent>
    </AlertComponent.AlertDialog>
  );
};

export default AlertDialog;
