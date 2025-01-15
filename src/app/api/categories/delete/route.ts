import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";

export async function DELETE(req: Request) {
  const { ids } = await req.json();

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    await prisma.category.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: "Categories deleted successfully" });
  } catch (error) {
    console.error("Error deleting categories:", error);
    return NextResponse.json(
      { error: "Failed to delete categories" },
      { status: 500 }
    );
  }
}