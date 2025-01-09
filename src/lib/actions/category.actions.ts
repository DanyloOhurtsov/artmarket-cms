"use server";

import { prisma } from "@/app/api/categories/route";

export async function createCategory(data: {
  name: string;
  slug: string;
  shortDesc?: string;
  description?: string;
  parentId?: string | null;
  image?: string;
}) {
  try {
    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        shortDesc: data.shortDesc,
        description: data.description,
        parentId: data.parentId,
        image: data.image,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Помилка при створенні категорії:", error);
    return new Response(
      JSON.stringify({ error: "Не вдалося створити категорію" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
