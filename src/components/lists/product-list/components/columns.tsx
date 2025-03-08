"use client";

import Image from "next/image";
import { BarcodeIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from "@/lib/schemas/new/product.schema";

export const columns: ColumnDef<ProductType>[] = [
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
    id: "separator",
    header: () => <div className="w-px h-6 bg-primary/20 mx-auto" />,
    cell: () => <div className="w-px h-6 bg-primary/20 mx-auto" />,
  },
  {
    accessorKey: "title",
    header: () => (
      <div className="pl-10">
        <p>Назва</p>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <div className="size-8 relative rounded-md overflow-hidden">
            {row.original.featuredImage &&
            row.original.featuredImage.url !== "" ? (
              <Image
                src={row.original.featuredImage.url}
                width={50}
                height={50}
                alt="Category image"
              />
            ) : (
              <div className="size-full bg-primary/20  flex items-center justify-center">
                <BarcodeIcon size={24} className="opacity-30 size-4" />
              </div>
            )}
          </div>
          <div>{row.original.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "availableForSale",
    header: () => <div className="">Активний</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.original.availableForSale ? "Так" : "Ні"}
      </div>
    ),
  },
  {
    accessorKey: "collections",
    header: () => <div className="">Категорії</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        {row.original.collections && row.original.collections.length > 0 ? (
          <p>{row.original.collections.length}</p>
        ) : (
          <p>- - -</p>
        )}
      </div>
    ),
  },
];
