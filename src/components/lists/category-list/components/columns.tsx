"use client";

import Image from "next/image";
import { BoxIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryType } from "@/lib/schemas/category.schema";

export const columns: ColumnDef<CategoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Назва",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="size-8 relative rounded-md overflow-hidden">
          {row.original.image && row.original.image !== "" ? (
            <Image
              src={row.original.image}
              width={50}
              height={50}
              alt="Category image"
            />
          ) : (
            <div className="size-full bg-primary/20 rounded-md flex items-center justify-center">
              <BoxIcon size={24} className="text-primary/30 size-4" />
            </div>
          )}
        </div>
        <div>{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: "Товари",
    cell: ({ row }) => row.original.products.length,
  },
];
