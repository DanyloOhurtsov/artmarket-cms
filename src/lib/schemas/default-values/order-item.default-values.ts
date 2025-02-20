import { v4 as uuid } from "uuid";

import { OrderItemType } from "../new/order/order-item.schema";
import { OrderDefaultValues } from "./order.default-values";
import { ProductDefaultValues } from "./product.default-values";
import { VariantDefaultValues } from "./variant.default-values";

export const OrderItemDefaultValues: OrderItemType = {
  id: `order-item-${uuid()}`,
  quantity: 0,
  price: 0,
  orderId: "",
  order: OrderDefaultValues,
  productId: "",
  product: ProductDefaultValues,
  selectedVariantId: "",
  selectedVariant: VariantDefaultValues,
};
