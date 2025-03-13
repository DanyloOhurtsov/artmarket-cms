export type MetricReturnType = {
  date: string;
  currentPeriod: number;
  previousPeriod: number;
};

export type MetricType =
  | "sales_total" // Загальна кількість продажів (грн)
  | "orders_count" // Загальна кількість замовлень
  | "average_order_value" // Середня вартість замовлення (грн)
  | "average_items_per_order" // Середня кількість товарів у замовленні
  | "total_units_sold" // Загальна кількість проданих одиниць
  | "inventory_turnover" // Оборот товарів (швидкість продажу запасів)
  | "top_selling_products" // Найпопулярніші товари (ID або перелік)
  | "sales_growth"; // Зростання продажів (відсоток зростання)
