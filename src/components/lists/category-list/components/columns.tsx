"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryType } from "@/lib/schemas/category.schema";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
