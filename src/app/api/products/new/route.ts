import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import { productSchema, ProductType } from "@/lib/schemas/new/product.schema";

export async function POST(req: NextRequest) {
  try {
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

    const existingProduct = await prisma.productModel.findUnique({
      where: { handle: validatedData.handle },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          error: "Товар з такою назвою вже існує. Будь ласка замініть на іншу",
        },
        { status: 400 }
      );
    }

    const featuredImageData = validatedData.featuredImage
      ? {
          create: {
            url: validatedData.featuredImage.url,
          },
        }
      : undefined;

    const imageData =
      validatedData.images && validatedData.images.length > 0
        ? {
            createMany: {
              data: validatedData.images.map((image) => ({
                url: image.url,
              })),
            },
          }
        : undefined;

    const variantsData =
      validatedData.variants && validatedData.variants.length > 0
        ? {
            createMany: {
              data: validatedData.variants.map((variant) => ({
                title: variant.title,
                price: variant.price,
                quantityAvailable: variant.quantityAvailable,
              })),
            },
          }
        : undefined;

    const seoData = validatedData.seo
      ? {
          create: {
            title: validatedData.seo.title,
            description: validatedData.seo.description || "",
          },
        }
      : undefined;

    const collectionsData =
      validatedData.collections && validatedData.collections.length > 0
        ? {
            connect: validatedData.collections.map((collection) => ({
              id: collection.id,
            })),
          }
        : undefined;

    const newProduct = await prisma.productModel.create({
      data: {
        id: `product-${uuid()}`,
        title: validatedData.title,
        handle: validatedData.handle,
        vendor: validatedData.vendor,

        description: validatedData.description || "",
        shortDescription: validatedData.shortDescription || "",

        availableForSale: validatedData.availableForSale,
        totalInventory: validatedData.totalInventory,

        minPrice: validatedData.minPrice,
        maxPrice: validatedData.maxPrice,

        featuredImage: featuredImageData,
        images: imageData,
        variants: variantsData,
        seo: seoData,
        collections: collectionsData,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
