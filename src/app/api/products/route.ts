import prisma from "@/utils/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
    return new Response(
      JSON.stringify({ error: "Не вдалося отримати продукти" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
