"use client";

import Container from "@/components/container";
import PageTitle from "@/components/page-title/page-title";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/functions/fetcher";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";

const DashboardPage = () => {
  const [period, setPeriod] = useState<"7d" | "30d" | "1y">("7d");

  const { data, isLoading, error } = useSWR(
    `/api/metrics/sales_total?period=${period}`,
    fetcher
  );
  console.log(data);

  return (
    <section>
      <PageTitle title="Dashboard" />

      <div className="flex w-full p-2">
        <div className="border flex rounded-full overflow-hidden">
          <Button
            variant={period === "7d" ? "default" : "ghost"}
            onClick={() => setPeriod("7d")}
            className="rounded-none w-1/3 min-w-fit"
          >
            Тиждень
          </Button>
          <Button
            variant={period === "30d" ? "default" : "ghost"}
            onClick={() => setPeriod("30d")}
            className="rounded-none w-1/3 min-w-fit"
          >
            Місяць
          </Button>
          <Button
            variant={period === "1y" ? "default" : "ghost"}
            onClick={() => setPeriod("1y")}
            className="rounded-none w-1/3 min-w-fit"
          >
            Рік
          </Button>
        </div>
      </div>
      <Container isLoading={isLoading} isError={!!error} isData={!!data}>
        <div className="p-4">
          <p>Dashboard content</p>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
