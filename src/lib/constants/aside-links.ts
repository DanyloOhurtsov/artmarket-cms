import {
  LayoutDashboardIcon,
  BoxesIcon,
  TagIcon,
  ShoppingCartIcon,
  Users2Icon,
  SquareMenuIcon,
} from "lucide-react";

export const asideLinks = [
  {
    title: "Головна",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Категорії",
    href: "/dashboard/categories",
    icon: BoxesIcon,
  },
  {
    title: "Продукти",
    href: "/dashboard/products",
    icon: TagIcon,
  },
  {
    title: "Меню",
    href: "/dashboard/menu",
    icon: SquareMenuIcon,
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
