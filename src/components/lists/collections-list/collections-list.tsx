"use client";

import useSWR from "swr";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { fetcher } from "@/lib/functions/fetcher";
import * as TableComponent from "@/components/ui/table";
import DeleteDropdownButton from "@/components/buttons/delete-dropdown.button";

import { columns } from "./components/columns";
import CollectionItem from "./components/collection-item";

const CollectionsList = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { data, error, isLoading, mutate } = useSWR(
    "/api/collections",
    fetcher
  );

  const table = useReactTable({
    data: data || [],
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
      const res = await fetch("/api/collections/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (!res.ok) toast.error("Не вдалося видалити колекції");

      const label = selectedIds.length === 1 ? "колекцію" : "колекцій";

      toast.success(`Успішно видалено ${selectedIds.length} ${label}`);

      mutate();
      setRowSelection({});
    } catch (error) {
      console.error("Error:", error);
      toast.error("Не вдалося видалити колекції");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const isDisabled = !Object.keys(rowSelection).length;
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <div className="flex justify-between items-center">
        <span>Фільтри</span>
        <DeleteDropdownButton
          isDisabled={isDisabled}
          onClick={handleDelete}
          label={
            selectedCount > 1
              ? "Видалити категорії"
              : selectedCount === 1
              ? "Видалити категорію"
              : "Виберіть категорії"
          }
        />
      </div>

      <TableComponent.Table>
        {/* Header */}
        <TableComponent.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableComponent.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableComponent.TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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
              .rows.map((row) => <CollectionItem key={row.id} row={row} />)
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

export default CollectionsList;
