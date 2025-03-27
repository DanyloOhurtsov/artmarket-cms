"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";
import GridLayout from "@/components/grid-layout/grid-layout";
import { PeriodDashboardType } from "@/lib/constants/period-varinats";

const DashboardPage = () => {
  const [period, setPeriod] = useState<PeriodDashboardType>("7d");

  useEffect(() => {
    const savedPeriod = localStorage.getItem("dashboardPeriod");
    if (savedPeriod) {
      setPeriod(savedPeriod as PeriodDashboardType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardPeriod", period);
  }, [period]);

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

      <GridLayout period={period} />
    </section>
  );
};

export default DashboardPage;
