import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        children: true, // Включити підкатегорії
        products: true, // Включити продукти (за потреби)
      },
    });

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Помилка при отриманні категорій:", error);
    return new Response(
      JSON.stringify({ error: "Не вдалося отримати категорії" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
