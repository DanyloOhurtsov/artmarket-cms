import { flexRender, Row } from "@tanstack/react-table";
import * as TableComponent from "@/components/ui/table";
import { CategoryType } from "@/lib/schemas/category.schema";

interface CategoryItemProps {
  row: Row<CategoryType>;
}

const CategoryItem = ({ row }: CategoryItemProps) => {
  const categoryUrl = `/dashboard/categories/${row.original.id}`;

  return (
    <TableComponent.TableRow
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
      className="cursor-pointer"
      onClick={() => (window.location.href = categoryUrl)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableComponent.TableCell key={cell.id}>
          {cell.column.id === "select" ? (
            // Зупиняємо подію для чекбокса
            <div
              onClick={(e) => e.stopPropagation()} // Зупиняємо спливання події
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

export default CategoryItem;
