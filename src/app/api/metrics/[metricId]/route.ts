import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { subDays, subMonths, format, startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export async function GET(
  req: NextRequest,
  { params }: { params: { metricId: string } }
) {
  const { metricId } = params;
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "7d";

  const now = new Date();
  let data = [];

  try {
    if (period === "7d" || period === "30d") {
      const days = period === "7d" ? 7 : 30;

      for (let i = days - 1; i >= 0; i--) {
        const day = subDays(now, i);
        const from = startOfDay(day);
        const to = endOfDay(day);

        switch (metricId) {
          case "sales_total":
            const dailySales = await prisma.orderModel.aggregate({
              _sum: { totalAmount: true },
              where: {
                createdAt: {
                  gte: from,
                  lte: to,
                },
              },
            });

            data.push({
              date: format(day, "yyyy-MM-dd"),
              value: dailySales._sum.totalAmount ?? 0,
            });
            break;

          case "orders_count":
            const dailyCount = await prisma.orderModel.count({
              where: {
                createdAt: {
                  gte: from,
                  lte: to,
                },
              },
            });

            data.push({
              date: format(day, "yyyy-MM-dd"),
              value: dailyCount,
            });
            break;

          default:
            return NextResponse.json(
              { error: "Unknown metricId" },
              { status: 404 }
            );
        }
      }
    } else if (period === "1y") {
      for (let i = 11; i >= 0; i--) {
        const month = subMonths(now, i);
        const from = startOfMonth(month);
        const to = endOfMonth(month);

        switch (metricId) {
          case "sales_total":
            const monthlySales = await prisma.orderModel.aggregate({
              _sum: { totalAmount: true },
              where: {
                createdAt: {
                  gte: from,
                  lte: to,
                },
              },
            });

            data.push({
              date: format(month, "yyyy-MM"),
              value: monthlySales._sum.totalAmount ?? 0,
            });
            break;

          case "orders_count":
            const monthlyCount = await prisma.orderModel.count({
              where: {
                createdAt: {
                  gte: from,
                  lte: to,
                },
              },
            });

            data.push({
              date: format(month, "yyyy-MM"),
              value: monthlyCount,
            });
            break;

          default:
            return NextResponse.json(
              { error: "Unknown metricId" },
              { status: 404 }
            );
        }
      }
    } else {
      return NextResponse.json(
        { error: "Invalid period parameter" },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
