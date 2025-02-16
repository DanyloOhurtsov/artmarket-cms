import { v4 as uuid } from "uuid";

import { ProductType } from "../new/product.schema";
import { VariantDefaultValues } from "./variant.default-values";

export const ProductDefaultValues: ProductType = {
  id: `product-${uuid()}`,
  title: "",
  handle: "",
  vendor: "",
  description: "",
  shortDescription: "",
  availableForSale: true,
  totalInventory: 0,
  minPrice: 0,
  maxPrice: 0,
  featuredImageId: undefined,
  featuredImage: undefined,
  images: [],
  variants: [VariantDefaultValues],
  seoId: undefined,
  seo: undefined,
  collections: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
};
