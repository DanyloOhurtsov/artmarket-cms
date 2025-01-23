import { ProductType } from "@/lib/schemas/product.schema";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const body: ProductType = await req.json();

    console.log(body.variants[0].values);

    const {
      id,
      name,
      slug,
      description,
      shortDesc,
      minOrder,
      maxOrder,
      stock,
      price,
      isActive,
      category,
      images,
      variants,
    } = body;

    const product = await prisma.product.create({
      data: {
        id,
        name,
        slug,
        description,
        shortDesc,
        minOrder,
        maxOrder,
        stock,
        price,
        isActive,
        categoryId: category.id,
        images,
        // variants,
      },
    });
    //   const products = await prisma.product.findMany({
    //     include: {
    //       category: true,
    //     },
    //   });

    //   return new Response(JSON.stringify(products), {
    //     status: 200,
    //     headers: { "Content-Type": "application/json" },
    //   });
  } catch (error) {
    //   console.error("Помилка при отриманні продуктів:", error);
    //   return new Response(
    //     JSON.stringify({ error: "Не вдалося отримати продукти" }),
    //     { status: 500, headers: { "Content-Type": "application/json" } }
    //   );
  }
}
