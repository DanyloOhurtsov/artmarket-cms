import { v4 as uuid } from "uuid";
import { ImageType } from "../new/image.schema";

export const ImageDefaultValues: ImageType = {
  id: `image-${uuid()}`,
  url: "",
  productId: null,
  product: undefined,
  featuredInProduct: undefined,
  collection: undefined,
  variant: undefined,
};
