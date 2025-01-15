"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "../ui/button";

interface GoBackButtonProps {
  label: string;
  variant?: ButtonProps["variant"];
}
const GoBackButton = ({ label, variant = "default" }: GoBackButtonProps) => {
  const router = useRouter();

  return (
    <Button variant={variant} onClick={() => router.back()}>
      {label}
    </Button>
  );
};

export default GoBackButton;
