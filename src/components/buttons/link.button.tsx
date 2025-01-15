import Link from "next/link";

import { Button, ButtonProps } from "../ui/button";

interface LinkButtonProps {
  label: string;
  href: string;
  variant?: ButtonProps["variant"];
}
const LinkButton = ({ label, href, variant = "default" }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button variant={variant}>{label}</Button>
    </Link>
  );
};

export default LinkButton;
