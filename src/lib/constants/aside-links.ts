import {
  LayoutDashboardIcon,
  BoxesIcon,
  TagIcon,
  ShoppingCartIcon,
  Users2Icon,
} from "lucide-react";

export const asideLinks = [
  {
    title: "Головна",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Колекції",
    href: "/dashboard/collections",
    icon: BoxesIcon,
  },
  {
    title: "Продукти",
    href: "/dashboard/products",
    icon: TagIcon,
    subLinks: [
      {
        title: "Інвентар",
        href: "/dashboard/products/inventory",
      },
      {
        title: "Архів товарів",
        href: "/dashboard/products/archive",
      },
    ],
  },
  {
    title: "Замовлення",
    href: "/dashboard/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Користувачі",
    href: "/dashboard/users",
    icon: Users2Icon,
  },
];
