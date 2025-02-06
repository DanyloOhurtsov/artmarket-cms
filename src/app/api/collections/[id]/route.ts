import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { CollectionType } from "@/lib/schemas/new/collection.schema";

// Отримання категорії
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const collection = await prisma.collectionModel.findUnique({
      where: { handle: id },
      include: {
        products: true,
        image: true,
      },
    });

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(collection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Оновлення колекції
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const body: CollectionType = await req.json();

    const { title, handle, image } = body;
    if (!title || !handle) {
      return NextResponse.json(
        { error: "Назва та slug є обов'язковими полями" },
        { status: 400 }
      );
    }

    const updatedCollection = await prisma.collectionModel.update({
      where: { handle: id },
      data: {
        title,
        handle,
        description: body.description,
        image: {
          create: {
            id: `image-${uuid()}`,
            url: image?.url || "",
            productId: image?.productId || null,
          },
        },
      },
    });

    return NextResponse.json(updatedCollection);
  } catch (error) {
    console.error("Error updating collection:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
  // try {
  //   const body = await req.json();

  //   const { name, slug, shortDesc, description, image } = body;
  //   if (!name || !slug) {
  //     return NextResponse.json(
  //       { error: "Усі поля повинні бути заповнені" },
  //       { status: 400 }
  //     );
  //   }

  //   // Оновлення категорії в базі даних
  //   const updatedCategory = await prisma.collectionModel.update({
  //     where: { id },
  //     data: {
  //       title: name,
  //       handle: slug,
  //       shortDescription: shortDesc,
  //       description,
  //       image,
  //     },
  //   });

  //   return NextResponse.json(updatedCategory);
  // } catch (error) {
  //   console.error("Помилка оновлення категорії:", error);
  //   return NextResponse.json(
  //     { error: "Щось пішло не так під час оновлення" },
  //     { status: 500 }
  //   );
  // }
}
