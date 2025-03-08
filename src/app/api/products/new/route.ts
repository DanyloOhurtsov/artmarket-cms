import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { productSchema } from "@/lib/schemas/new/product.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = productSchema.parse(body);

    // Транзакція для створення пов'язаних сутностей
    const seo = await prisma.seoModel.create({
      data: {
        id: uuid(),
        title: validatedData.seo?.title || "",
        description: validatedData.seo?.description || "",
      },
    });

    const images =
      validatedData.images && validatedData.images?.length > 0
        ? await Promise.all(
            validatedData.images?.map(async (image) =>
              prisma.imageModel.create({
                data: {
                  id: image.id,
                  url: image.url,
                  product: { connect: { id: validatedData.id } },
                },
              })
            ) || []
          )
        : undefined;

    const product = await prisma.productModel.create({
      data: {
        id: validatedData.id,
        title: validatedData.title,
        handle: validatedData.handle,
        vendor: validatedData.vendor,
        description: validatedData.description || "",
        shortDescription: validatedData.shortDescription || "",
        availableForSale: validatedData.availableForSale,
        totalInventory: validatedData.totalInventory,
        minPrice: validatedData.minPrice,
        maxPrice: validatedData.maxPrice,
        seoId: seo.id,
        featuredImageId: validatedData.featuredImageId,
        collections: {
          connect: validatedData.collections?.map((c) => ({ id: c.id })),
        },
        variants: {
          create: validatedData.variants?.map((variant) => {
            const quantityRuleData = variant.quantityRule
              ? {
                  quantityRule: {
                    create: {
                      id: `qrule-${uuid()}`,
                      minimum: variant.quantityRule.minimum,
                      maximum: variant.quantityRule.maximum,
                    },
                  },
                }
              : {};
            return {
              id: `variant-${uuid()}`,
              title: variant.title,
              price: variant.price,
              quantityAvailable: variant.quantityAvailable,
              ...quantityRuleData,
            };
          }),
        },
        images: {
          create: images,
        },
      },
      include: {
        images: true,
        variants: true,
        seo: true,
        collections: true,
      },
    });

    console.log(product);

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.log("Error creating product:", error);

    return NextResponse.json(
      { error: "Помилка при створенні товару" },
      { status: 500 }
    );
  }
}
