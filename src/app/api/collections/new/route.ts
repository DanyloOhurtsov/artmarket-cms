import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { collectionSchema } from "@/lib/schemas/new/collection.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Валідація даних через Zod
    const validatedData = collectionSchema.parse({
      ...body,
      image: body.image
        ? {
            id: body.image.id || `image-${uuid()}`,
            url: body.image.url || "", // Забезпечуємо, що url ніколи не буде undefined
          }
        : undefined,
    });

    // Перевірка унікальності handle
    const existingCollection = await prisma.collectionModel.findUnique({
      where: { handle: validatedData.handle },
    });

    if (existingCollection) {
      return NextResponse.json(
        {
          error:
            "Колекція з такою назвою вже існує. Будь ласка замініть на іншу",
        },
        { status: 400 }
      );
    }

    const seoData = validatedData.seo
      ? {
          create: {
            id: validatedData.seo.id || `seo-${uuid()}`,
            title: validatedData.seo.title,
            description: validatedData.seo.description || "", // Забезпечуємо значення за замовчуванням
          },
        }
      : undefined;

    const imageData = validatedData.image
      ? {
          create: {
            id: validatedData.image.id,
            url: validatedData.image.url, // `url` гарантовано є завдяки валідації
          },
        }
      : undefined;

    // Створення колекції
    const newCollection = await prisma.collectionModel.create({
      data: {
        id: validatedData.id || `collection-${uuid()}`,
        title: validatedData.title,
        handle: validatedData.handle,
        description: validatedData.description || "", // Забезпечуємо значення за замовчуванням
        image: imageData,
        seo: seoData,
      },
    });

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error: unknown) {
    console.error("Помилка при створенні колекції:", error);

    return NextResponse.json(
      { error: "Не вдалося створити колекцію", details: error },
      { status: 500 }
    );
  }
}
