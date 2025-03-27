"use client ";

import useSWR from "swr";

import { fetcher } from "@/lib/functions/fetcher";
import LoadingContainer from "@/components/container";
import { MetricReturnType, MetricType } from "@/lib/types/type";
import { PeriodDashboardType } from "@/lib/constants/period-varinats";

interface GridItemProps {
  period: PeriodDashboardType;
  metricType: MetricType;
}

const GridItem = ({ period, metricType }: GridItemProps) => {
  const fetchUrl =
    metricType === "top_selling_product"
      ? `/api/metrics/top-selling-product?period=${period}`
      : `/api/metrics/general-metrics/${metricType}?period=${period}`;

  const { data, isLoading, error } = useSWR<MetricReturnType[]>(
    fetchUrl,
    fetcher
  );

  console.log(data);

  return (
    <LoadingContainer isData={!!data} isLoading={isLoading} isError={!!error}>
      <div className="flex flex-col">Hello data</div>
    </LoadingContainer>
  );
};

export default GridItem;
