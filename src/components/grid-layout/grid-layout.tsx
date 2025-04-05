import { PeriodDashboardType } from "@/lib/constants/period-varinats";

import GridItem from "./components/grid-item";

interface GridLayoutProps {
  period: PeriodDashboardType;
}
const GridLayout = ({ period }: GridLayoutProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      <GridItem
        period={period}
        metricType="sales_total"
        title="Продажів загалом, грн"
        description="Загальна сума продажів за обраний період"
      />
      <GridItem
        period={period}
        metricType="orders_count"
        title="Кількість замовлень"
        description="Кількість замовлень за обраний період"
      />
      <GridItem
        period={period}
        metricType="average_order_value"
        title="Середня вартість замовлення"
        description="Середня вартість замовлення за обраний період"
      />
    </div>
  );
};

export default GridLayout;
