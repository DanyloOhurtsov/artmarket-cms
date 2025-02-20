import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(req: Request) {
  const { ids } = await req.json();

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const productsToUpdate = await prisma.productModel.findMany({
      where: {
        collections: {
          some: {
            id: { in: ids },
          },
        },
      },
    });

    // Для кожного товару оновлюємо зв'язок: від'єднуємо колекції з переданими id
    await Promise.all(
      productsToUpdate.map((product) =>
        prisma.productModel.update({
          where: { id: product.id },
          data: {
            collections: {
              disconnect: ids.map((id: string) => ({ id })),
            },
          },
        })
      )
    );

    await prisma.collectionModel.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { error: "Failed to delete collection" },
      { status: 500 }
    );
  }
}
