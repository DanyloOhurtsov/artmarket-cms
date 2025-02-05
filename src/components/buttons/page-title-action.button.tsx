import React from "react";
import { Button, ButtonProps } from "../ui/button";
import Link from "next/link";

interface PageTitleActionButtonProps {
  path: string;
  label: string;
  variand?: ButtonProps["variant"];
  children?: React.ReactNode;
}

const PageTitleActionButton = ({
  label,
  path,
  variand,
  children,
}: PageTitleActionButtonProps) => {
  return (
    <Link href={path} passHref>
      <Button variant={variand}>
        {label}
        {children}
      </Button>
    </Link>
  );
};

export default PageTitleActionButton;
