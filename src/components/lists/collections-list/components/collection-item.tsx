import { cn } from "@/lib/utils";
import * as TableComponent from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { CollectionType } from "@/lib/schemas/new/collection.schema";

const CollectionItem = ({ row }: { row: Row<CollectionType> }) => {
  const url = `/dashboard/collections/${row.original.handle}`;

  return (
    <TableComponent.TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className="cursor-pointer"
      onClick={() => (window.location.href = url)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableComponent.TableCell
          key={cell.id}
          className={cn(
            cell.column.id === "select" && "w-6",
            cell.column.id === "separator" && "w-6",
            cell.column.id === "title" && "pl-0"
          )}
        >
          {cell.column.id === "select" ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="h-full flex items-center"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </TableComponent.TableCell>
      ))}
    </TableComponent.TableRow>
  );
};

export default CollectionItem;
