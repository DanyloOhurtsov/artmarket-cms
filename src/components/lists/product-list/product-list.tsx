"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import * as TableComponent from "@/components/ui/table";
import { ProductType } from "@/lib/schemas/new/product.schema";

import { columns } from "./components/columns";
import ProductItem from "./components/product-item";
import { cn } from "@/lib/utils";
import DeleteDropdownButton from "@/components/buttons/delete-dropdown.button";
import toast from "react-hot-toast";

interface ProductListProps {
  products: ProductType[];
  mutate: () => void;
}
const ProductList = ({ products, mutate }: ProductListProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: products || [],
    columns,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const handleDelete = async () => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);

      console.log(selectedIds);
    if (!selectedIds.length) return;

    try {
      const res = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) toast.error("Не вдалося видалити продукти");

      const label = selectedIds.length === 1 ? "продукт" : "продукти";

      toast.success(`Успішно видалено ${selectedIds.length} ${label}`);

      // mutate();
      setRowSelection({});
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Не вдалося видалити продукти");
    }
  };

  const isDisabled = !Object.keys(rowSelection).length;
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div>
      <div>
        <span>Фільтри</span>
        <DeleteDropdownButton
          isDisabled={isDisabled}
          onClick={handleDelete}
          label={
            selectedCount === 1
              ? "Видалити продукт"
              : `Видалити ${selectedCount} продукти`
          }
        />
      </div>

      <TableComponent.Table>
        <TableComponent.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableComponent.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableComponent.TableHead
                    key={header.id}
                    className={cn(
                      header.column.id === "separator" && "w-2",
                      header.column.id === "title" && "pl-0"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableComponent.TableHead>
                );
              })}
            </TableComponent.TableRow>
          ))}
        </TableComponent.TableHeader>

        {/* Body */}
        <TableComponent.TableBody>
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => <ProductItem key={row.id} row={row} />)
          ) : (
            <TableComponent.TableRow>
              <TableComponent.TableCell colSpan={columns.length}>
                No res
              </TableComponent.TableCell>
            </TableComponent.TableRow>
          )}
        </TableComponent.TableBody>
      </TableComponent.Table>
    </div>
  );
};

export default ProductList;
