import { CollectionType } from "../new/collection.schema";
import { ImageDefaultValues } from "./image.default-values";

export const collectionDefaultValues: CollectionType = {
  id: '',
  title: "",
  handle: "",
  description: "",
  imageId: undefined,
  image: ImageDefaultValues,
  seoId: undefined,
  seo: undefined,
  products: [],
  menuItems: [],
};
