"use client ";

import useSWR from "swr";

import { fetcher } from "@/lib/functions/fetcher";
import LoadingContainer from "@/components/container";
import { MetricReturnType, MetricType } from "@/lib/types/type";
import { PeriodDashboardType } from "@/lib/constants/period-varinats";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GridItemProps {
  period: PeriodDashboardType;
  metricType: MetricType;
  title: string;
  description?: string;
  width?: number; // від 1 до 12
  visible?: boolean;
}

const chartConfig = {
  currentPeriod: {
    label: "Поточний період",
    color: "#60a5fa",
  },
  previousPeriod: {
    label: "Минулий період",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const GridItem = ({
  period,
  metricType,
  title,
  description,
  width = 4,
  visible = true,
}: GridItemProps) => {
  const fetchUrl =
    metricType === "top_selling_product"
      ? `/api/metrics/top-selling-product?period=${period}`
      : `/api/metrics/general-metrics/${metricType}?period=${period}`;

  const { data, isLoading, error } = useSWR<MetricReturnType[]>(
    fetchUrl,
    fetcher
  );

  return (
    <LoadingContainer isData={!!data} isLoading={isLoading} isError={!!error}>
      <Card className="h-fit overflow-hidden">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent className="overflow-visible pb-0">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={true}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={true} axisLine={false} />

              <ChartTooltip
                content={<ChartTooltipContent hideLabel={true} />}
              />
              <Area
                dataKey="currentPeriod"
                type="bump"
                fill="var(--color-desktop)"
                fillOpacity={0.5}
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <Area
                dataKey="previousPeriod"
                type="bump"
                fill="var(--color-mobile)"
                fillOpacity={0.5}
                stroke="var(--color-mobile)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex gap-x-5 justify-center">
          <div className="flex items-center gap-x-2">
            <div className="size-3 bg-[#60a5fa] rounded-sm" />
            <p className="text-sm">Поточний період</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="size-3 bg-[#2563eb] rounded-sm" />
            <p className="text-sm">Минулий період</p>
          </div>
        </CardFooter>
      </Card>
    </LoadingContainer>
  );
};

export default GridItem;
