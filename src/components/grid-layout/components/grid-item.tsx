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
  const { data, isLoading, error } = useSWR<MetricReturnType[]>(
    `/api/metrics/${metricType}?period=${period}`,
    fetcher
  );

  return (
    <LoadingContainer isData={!!data} isLoading={isLoading} isError={!!error}>
      <div className="flex flex-col">

      </div>
    </LoadingContainer>
  );
};

export default GridItem;
