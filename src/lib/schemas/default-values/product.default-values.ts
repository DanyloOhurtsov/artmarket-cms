import { ProductType } from "../new/product.schema";

export const ProductDefaultValues: ProductType = {
  id: "",
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
  variants: [],
  seoId: undefined,
  seo: undefined,
  collection: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
};
