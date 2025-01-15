import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { CategoryType } from "@/lib/schemas/category.schema";

export async function POST(req: NextRequest) {
  try {
    const body: CategoryType = await req.json();

    // Перевіряємо, чи передано обов'язкові поля
    const { name, slug, shortDesc, description, parentId, image } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Назва та slug є обов'язковими полями" },
        { status: 400 }
      );
    }

    // Створюємо категорію у базі даних
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug,
        shortDesc,
        description,
        parentId,
        image,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Помилка при створенні категорії:", error);

    return NextResponse.json(
      { error: "Не вдалося створити категорію" },
      { status: 500 }
    );
  }
}
