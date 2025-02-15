import { productSchema, ProductType } from "@/lib/schemas/new/product.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data: ProductType = await req.json();

  const validatedData = productSchema.parse({
    ...data,
    featuredImage: data.featuredImage
      ? {
          url: data.featuredImage.url || "",
          productId: data.featuredImage.productId || null,
        }
      : undefined,
    images:
      data.images && data.images.length > 0
        ? data.images.map((image) => ({
            url: image.url || "",
            productId: image.productId || null,
          }))
        : undefined,
  });

  console.log(data);
}
