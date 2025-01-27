import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

// Отримання категорії
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Отримуємо id з context.params

  console.log("id", id);

  try {
    const collection = await prisma.collectionModel.findUnique({
      where: { handle: id },
      include: {
        products: true,
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

// // Оновлення категорії
// export async function PUT(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   try {
//     const body = await req.json();

//     const { name, slug, shortDesc, description, image } = body;
//     if (!name || !slug) {
//       return NextResponse.json(
//         { error: "Усі поля повинні бути заповнені" },
//         { status: 400 }
//       );
//     }

//     // Оновлення категорії в базі даних
//     const updatedCategory = await prisma.collectionModel.update({
//       where: { id },
//       data: {
//         title: name,
//         handle: slug,
//         shortDescription: shortDesc,
//         description,
//         image,
//       },
//     });

//     return NextResponse.json(updatedCategory);
//   } catch (error) {
//     console.error("Помилка оновлення категорії:", error);
//     return NextResponse.json(
//       { error: "Щось пішло не так під час оновлення" },
//       { status: 500 }
//     );
//   }
// }
