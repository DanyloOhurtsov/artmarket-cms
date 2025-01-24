import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { v4 as uuid } from "uuid";
import { ImageType } from "@/lib/schemas/new/image.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Перевіряємо, чи передано обов'язкові поля
    const { title, handle, shortDescription, description, image } = body;

    if (!title || !handle) {
      return NextResponse.json(
        { error: "Назва та slug є обов'язковими полями" },
        { status: 400 }
      );
    }
    const newImage: ImageType = {
      id: `image-${uuid()}`,
      url: image,
    };

    // Створюємо категорію у базі даних
    const newCategory = await prisma.collectionModel.create({
      data: {
        id: `collection-${uuid()}`,
        title,
        handle,
        description,
        image: newImage,
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
