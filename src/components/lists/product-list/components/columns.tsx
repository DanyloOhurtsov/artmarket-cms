"use client";

import Image from "next/image";
import { BoxIcon } from "lucide-react";

import PriceRange from "@/components/price-range";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType } from "@/lib/schemas/new/product.schema";

export const columns: ColumnDef<ProductType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </>
    ),
    cell: ({ row }) => (
      <>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </>
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
                alt="Product image"
              />
            ) : (
              <div className="size-full bg-primary/20  flex items-center justify-center">
                <BoxIcon size={24} className="opacity-30 size-4" />
              </div>
            )}
          </div>
          <p>{row.original.title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div>
        <p>Ціна</p>
      </div>
    ),
    cell: ({ row }) => (
      <PriceRange
        minPrice={row.original.minPrice}
        maxPrice={row.original.maxPrice}
      />
    ),
  },
  {
    accessorKey: "quantity",
    header: () => (
      <div>
        <p>Кількість</p>
      </div>
    ),
    cell: ({ row }) => <p>{row.original.totalInventory}</p>,
  },
];
