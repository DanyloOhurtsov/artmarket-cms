import { v4 as uuid } from "uuid";

import { VariantType } from "../new/variant.schema";

export const VariantDefaultValues: VariantType = {
  id: `variant-${uuid()}`,
  title: "Default variant",
  weight: undefined,
  price: 0,
  availableForSale: true,
  quantityAvailable: 0,
  imageId: undefined,
  image: undefined,
  productId: undefined,
  product: undefined,
  quantityRuleId: undefined,
  quantityRule: undefined,
  orderItem: undefined,
};
