export type PeriodDashboardType = "7d" | "30d" | "1y";

export type PeriodVariantType = {
  value: PeriodDashboardType;
  label: string;
};

export const PeriodVariants: PeriodVariantType[] = [
  {
    value: "7d",
    label: "Тиждень",
  },
  {
    value: "30d",
    label: "Місяць",
  },
  {
    value: "1y",
    label: "Рік",
  },
];
