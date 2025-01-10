import { CircleAlertIcon } from "lucide-react";
import { ControllerFieldState } from "react-hook-form";

import * as FormComponent from "@/components/ui/form";

import HoverTooltip from "../hover-tooltip";

const ErrorToolTip = ({ fieldState }: { fieldState: ControllerFieldState }) => {
  const hasError = !!fieldState.error;
  
  return (
    <>
      {hasError ? (
        <HoverTooltip content={fieldState.error?.message} side="left">
          <FormComponent.FormMessage className="px-2">
            <CircleAlertIcon size={24} />
          </FormComponent.FormMessage>
        </HoverTooltip>
      ) : null}
    </>
  );
};

export default ErrorToolTip;
