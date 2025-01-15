import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const menuItems = await req.json();

    // Збереження меню
    await prisma.menu.create({
      data: {
        name: "Нове меню",
        items: {
          create: buildMenuItems(menuItems),
        },
      },
    });

    return NextResponse.json({ message: "Меню створено успішно" });
  } catch (error) {
    console.error("Помилка створення меню:", error);
    return NextResponse.json({ error: "Щось пішло не так" }, { status: 500 });
  }
}

function buildMenuItems(items: any[]): any[] {
  return items.map((item) => ({
    name: item.name,
    order: item.order || 1,
    children: { create: buildMenuItems(item.children || []) },
  }));
}
