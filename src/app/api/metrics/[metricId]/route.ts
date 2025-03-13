import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import {
  subDays,
  subMonths,
  format,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { MetricReturnType, MetricType } from "@/lib/types/type";

export async function GET(
  req: NextRequest,
  {
    params,
  }: { params: { metricId: Exclude<MetricType, "top_selling_products"> } }
) {
  const { metricId } = await params;
  const period = new URL(req.url).searchParams.get("period") || "7d";

  const now = new Date();
  const data: MetricReturnType[] = [];

  let unitCount = 0;
  let unit: "day" | "month" = "day";

  switch (period) {
    case "7d":
      unitCount = 7;
      unit = "day";
      break;
    case "30d":
      unitCount = 30;
      unit = "day";
      break;
    case "1y":
      unitCount = 12;
      unit = "month";
      break;
    default:
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
  }

  try {
    for (let i = unitCount - 1; i >= 0; i--) {
      const currentDate = unit === "day" ? subDays(now, i) : subMonths(now, i);

      const [from, to] =
        unit === "day"
          ? [startOfDay(currentDate), endOfDay(currentDate)]
          : [startOfMonth(currentDate), endOfMonth(currentDate)];

      const prevDate =
        unit === "day"
          ? subDays(currentDate, unitCount)
          : subMonths(currentDate, unitCount);

      const [prevFrom, prevTo] =
        unit === "day"
          ? [startOfDay(prevDate), endOfDay(prevDate)]
          : [startOfMonth(prevDate), endOfMonth(prevDate)];

      let currentValue = 0;
      let previousValue = 0;

      // SALES TOTAL
      if (metricId === "sales_total") {
        const currentSales = await prisma.orderModel.aggregate({
          _sum: { totalAmount: true },
          where: { createdAt: { gte: from, lte: to } },
        });

        const previousSales = await prisma.orderModel.aggregate({
          _sum: { totalAmount: true },
          where: { createdAt: { gte: prevFrom, lte: prevTo } },
        });

        currentValue = currentSales._sum.totalAmount ?? 0;
        previousValue = previousSales._sum.totalAmount ?? 0;
      }

      // ORDERS COUNT
      else if (metricId === "orders_count") {
        const currentCount = await prisma.orderModel.count({
          where: { createdAt: { gte: from, lte: to } },
        });

        const previousCount = await prisma.orderModel.count({
          where: { createdAt: { gte: prevFrom, lte: prevTo } },
        });

        currentValue = currentCount;
        previousValue = previousCount;
      }

      // AVERAGE ORDER VALUE
      else if (metricId === "average_order_value") {
        const currentSales = await prisma.orderModel.aggregate({
          _avg: { totalAmount: true },
          where: { createdAt: { gte: from, lte: to } },
        });

        const previousSales = await prisma.orderModel.aggregate({
          _avg: { totalAmount: true },
          where: { createdAt: { gte: prevFrom, lte: prevTo } },
        });

        currentValue = currentSales._avg.totalAmount ?? 0;
        previousValue = previousSales._avg.totalAmount ?? 0;
      }

      // NO METRIC FOUND
      else {
        return NextResponse.json(
          { error: "Unknown metricId" },
          { status: 404 }
        );
      }

      data.push({
        date: format(currentDate, unit === "day" ? "yyyy-MM-dd" : "yyyy-MM"),
        currentPeriod: currentValue,
        previousPeriod: previousValue,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
