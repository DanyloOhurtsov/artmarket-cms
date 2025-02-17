'use client'

import { useState } from "react";
import toast from "react-hot-toast";

import {
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import * as TableComponent from "@/components/ui/table";
import { ProductType } from "@/lib/schemas/new/product.schema";
import DeleteDropdownButton from "@/components/buttons/delete-dropdown.button";

import { columns } from "./components/columns";
import ProductItem from "./components/product-item";

interface ProductListProps {
  products: ProductType[];
}
const ProductList = ({ products }: ProductListProps) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data: products,
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

    if (!selectedIds.length) return;

    try {
      const res = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) toast.error("Не вдалося видалити товари");

      const label = selectedIds.length === 1 ? "товар" : "товари";

      toast.success(`Успішно видалено ${selectedIds.length} ${label}`);

      setRowSelection({});
      setRowSelection({});
    } catch (error) {
      console.error("Error:", error);
      toast.error("Не вдалося видалити товари");
    }
  };

  const isDisabled = !Object.keys(rowSelection).length;
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <div className="flex justify-between items-center">
        <span> TODO: Фильтри</span>

        <DeleteDropdownButton
          isDisabled={isDisabled}
          onClick={handleDelete}
          label={
            selectedCount === 1
              ? "Видалити товар"
              : `Видалити ${selectedCount} товари`
          }
        />
      </div>

      <TableComponent.Table>
        <TableComponent.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableComponent.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableComponent.TableHead
                  key={header.id}
                  className={cn(
                    header.column.id === "separator" && "w-2",
                    header.column.id === "title" && "pl-0"
                  )}
                >
                  {header.column.id === "select" ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="h-full flex items-center"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableComponent.TableHead>
              ))}
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
              <TableComponent.TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Не має результатів
              </TableComponent.TableCell>
            </TableComponent.TableRow>
          )}
        </TableComponent.TableBody>
      </TableComponent.Table>
    </div>
  );
};

export default ProductList;
