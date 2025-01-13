import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageTitle = ({ title, description, children }: PageTitleProps) => {
  return (
    <div className="flex w-full border-b justify-between items-center border-gray-300 p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageTitle;
