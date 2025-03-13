import { PeriodDashboardType } from "@/lib/constants/period-varinats";

import GridItem from "./components/grid-item";

interface GridLayoutProps {
  period: PeriodDashboardType;
}
const GridLayout = ({ period }: GridLayoutProps) => {
  return (
    <div>
      <GridItem period={period} metricType="sales_total" />
    </div>
  );
};

export default GridLayout;
