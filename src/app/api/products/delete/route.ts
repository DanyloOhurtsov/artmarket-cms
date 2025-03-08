import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { ids } = body;

  if (!ids || !Array.isArray(ids)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  console.log("Ids Route",ids);

  try {
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
