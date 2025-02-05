import { CollectionType } from "../new/collection.schema";

export const collectionDefaultValues: CollectionType = {
  id: "",
  title: "",
  handle: "",
  description: "",
  imageId: undefined,
  image: {
    id: "",
    url: "",
    productId: null,
  },
  seoId: undefined,
  seo: undefined,
  products: [],
  menuItems: [],
};
