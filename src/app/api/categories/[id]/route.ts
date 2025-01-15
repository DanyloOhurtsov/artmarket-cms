import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

// Отримання категорії
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        products: true,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Оновлення категорії
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const body = await req.json();

    const { name, slug, shortDesc, description, image } = body;
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Усі поля повинні бути заповнені" },
        { status: 400 }
      );
    }

    // Оновлення категорії в базі даних
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        shortDesc,
        description,
        image,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Помилка оновлення категорії:", error);
    return NextResponse.json(
      { error: "Щось пішло не так під час оновлення" },
      { status: 500 }
    );
  }
}

// Видалення категорії
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Перевірка існування категорії
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Категорія не знайдена" },
        { status: 404 }
      );
    }

    // Видалення категорії
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Категорія успішно видалена" });
  } catch (error) {
    console.error("Помилка видалення категорії:", error);
    return NextResponse.json(
      { error: "Щось пішло не так під час видалення" },
      { status: 500 }
    );
  }
}