import Link from "next/link";
import Image from "next/image";
import { BoxIcon } from "lucide-react";

import { CategoryType } from "@/lib/schemas/category.schema";

interface CategoryItemProps {
  category: CategoryType;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const categoryUrl = `/dashboard/categories/${category.id}`;

  return (
    <Link
      className="flex justify-between w-full p-2 border rounded-md"
      href={categoryUrl}
    >
      <div className="flex items-center gap-x-2">
        <div className="size-8 relative rounded-md overflow-hidden">
          {category.image ? (
            <>
              <Image alt={category.name} src={category.image.trim()} fill />
            </>
          ) : (
            <div className="size-full bg-primary/20 rounded-md flex items-center justify-center">
              <BoxIcon size={24} className="text-primary/30 size-4" />
            </div>
          )}
        </div>
        <p>{category.name}</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
