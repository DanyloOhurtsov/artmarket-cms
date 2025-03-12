import React, { useMemo } from "react";
import { Separator } from "../ui/separator";

interface CardDashboardProps {
  sizeHeight?: "sm" | "md" | "lg";
  sizeWidth?: "sm" | "md" | "lg";
  title: string;
  value: number;
  previousValue: number;
}

const CardDashboard = ({
  sizeHeight = "sm",
  sizeWidth = "sm",
  title,
  value,
  previousValue,
}: CardDashboardProps) => {
  const percentageChange = useMemo(() => {
    if (previousValue === 0) {
      return value === 0 ? 0 : 100;
    }
    return ((value - previousValue) / previousValue) * 100;
  }, [value, previousValue]);

  const formattedPercentage = useMemo(() => {
    const rounded = Math.round(percentageChange);
    const colorClass =
      rounded > 0
        ? "text-green-500"
        : rounded < 0
        ? "text-red-500"
        : "text-slate-600";
    // Використовуємо стрілочки: ↑ для позитивного, ↓ для негативного
    const arrow = rounded > 0 ? "↑" : rounded < 0 ? "↓" : "";
    return { text: `${arrow} ${Math.abs(rounded)}%`, colorClass };
  }, [percentageChange]);

  const gridWidthClass = useMemo(() => {
    const base =
      sizeWidth === "sm"
        ? "col-span-1"
        : sizeWidth === "md"
        ? "col-span-2"
        : "col-span-2";
    const md =
      sizeWidth === "sm"
        ? "md:col-span-1"
        : sizeWidth === "md"
        ? "md:col-span-2"
        : "md:col-span-3";
    const lg =
      sizeWidth === "sm"
        ? "lg:col-span-1"
        : sizeWidth === "md"
        ? "lg:col-span-2"
        : "lg:col-span-3";
    return `${base} ${md} ${lg}`;
  }, [sizeWidth]);

  // Обчислення класів для висоти (приклад, можете налаштовувати)
  const gridRowSpanClass = useMemo(() => {
    // Наприклад, sm: row-span-1, md: row-span-2, lg: row-span-3
    if (sizeHeight === "sm") return "row-span-1";
    if (sizeHeight === "md") return "row-span-2";
    if (sizeHeight === "lg") return "row-span-3";
    return "row-span-1";
  }, [sizeHeight]);

  return (
    <div
      className={`border border-gray-300 rounded-lg flex flex-col ${gridWidthClass} ${gridRowSpanClass}`}
    >
      <div className="p-2 flex flex-col justify-between">
        <h3 className="text-sm">{title}</h3>
        <div className="flex gap-x-2 items-center">
          <p className="text-2xl font-semibold">{value}</p>
          <p className={formattedPercentage.colorClass}>
            {formattedPercentage.text}
          </p>
        </div>
      </div>
      <Separator />
      <div className="p-2 flex-1 flex">
        <div className="size-full bg-red-50">Grafik</div>
      </div>
    </div>
  );
};

export default CardDashboard;
