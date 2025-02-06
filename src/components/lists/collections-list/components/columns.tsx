"use client";

import Image from "next/image";
import { BoxIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CollectionType } from "@/lib/schemas/new/collection.schema";

export const columns: ColumnDef<CollectionType>[] = [
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
            {row.original.image && row.original.image.url !== "" ? (
              <Image
                src={row.original.image.url}
                width={50}
                height={50}
                alt="Category image"
              />
            ) : (
              <div className="size-full bg-primary/20  flex items-center justify-center">
                <BoxIcon size={24} className="opacity-30 size-4" />
              </div>
            )}
          </div>
          <div>{row.original.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Товари",
    cell: ({ row }) => row.original.products?.length || 0,
  },
];
