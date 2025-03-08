"use client";

import CardDashboard from "@/components/cards/card.dashboard";
import PageTitle from "@/components/page-title/page-title";

import { useState } from "react";

const DashboardPage = () => {
  const [ordersData, setOrdersData] = useState({
    current: 170,
    previous: 80,
  });

  return (
    <section>
      <PageTitle title="Dashboard" />

      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 grid-flow-dense auto-rows-[144px]">
          <CardDashboard
            value={ordersData.current}
            previousValue={ordersData.previous}
            title="Загальна кількість продажів 1"
            sizeWidth="lg" // наприклад, займає 3 колонки на десктопі
            sizeHeight="sm"
          />
          {/* Додаткові карточки, які можуть мати інші розміри */}
          <CardDashboard
            value={120}
            previousValue={100}
            title="Інший показник 2"
            sizeWidth="sm" // займає 2 колонки на десктопі
            sizeHeight="md"
          />
          <CardDashboard
            value={90}
            previousValue={110}
            title="Ще один показник 3"
            sizeWidth="md" // займає 1 колонку на всіх пристроях
            sizeHeight="sm"
          />
          {/* Інші карточки */}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
