import Link from "next/link";

import { Button, ButtonProps } from "../ui/button";

interface PageTitleActionButtonProps {
  path: string;
  label: string;
  variand?: ButtonProps["variant"];
  children?: React.ReactNode;
  disabled?: boolean;
}

const PageTitleActionButton = ({
  label,
  path,
  variand,
  children,
  disabled = false,
}: PageTitleActionButtonProps) => {
  return (
    <Link href={path} passHref>
      <Button variant={variand} disabled={disabled}>
        {label}
        {children}
      </Button>
    </Link>
  );
};

export default PageTitleActionButton;
