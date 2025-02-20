import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    // Отримуємо тіло запиту безпечно
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const { ids } = body;
    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Знаходимо всі колекції, у яких є товари з переданими id
    const collectionsToUpdate = await prisma.collectionModel.findMany({
      where: {
        products: {
          some: {
            id: { in: ids },
          },
        },
      },
    });

    // Для кожної знайденої колекції розриваємо зв'язок з товарами
    await Promise.all(
      collectionsToUpdate.map((collection) =>
        prisma.collectionModel.update({
          where: { id: collection.id },
          data: {
            products: {
              disconnect: ids.map((id: string) => ({ id })),
            },
          },
        })
      )
    );

    // Потім видаляємо товари
    // const productsToDelete = await prisma.productModel.findMany({
    //   where: {
    //     id: { in: ids },
    //   },
    // });

    await prisma.variantModel.deleteMany({
      where: {
        productId: { in: ids },
      },
    });

    await prisma.productModel.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: "Products deleted successfully" });
  } catch (error) {
    console.error("Error deleting products:", error);
    return NextResponse.json(
      { error: "Failed to delete products" },
      { status: 500 }
    );
  }
}
