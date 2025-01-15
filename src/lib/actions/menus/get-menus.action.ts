"use server";

import prisma from "@/utils/prisma";

export const getMenus = async () => {
  const menus = await prisma.menu.findMany({
    include: {
      items: true,
    },
  });

  if (!menus) {
    return { error: "Не знайдено" };
  }

  return { data: menus };
};

