import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
        parentId: parentId || null,
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
