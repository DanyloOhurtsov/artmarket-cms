import { OrderType } from "../new/order/order.schema";
import { CustomerDefaultValues } from "./customer.default-values";

export const OrderDefaultValues: OrderType = {
  id: "",
  status: "",
  paymentMethod: "",
  shippingAddress: "",
  totalAmount: 0,
  customerId: "",
  customer: CustomerDefaultValues,
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
