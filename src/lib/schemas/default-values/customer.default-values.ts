import { CustomerType } from "../new/customer.schema";

export const CustomerDefaultValues: CustomerType = {
  id: "",
  firstName: "",
  lastName: "",
  patronymic: undefined,
  email: "",
  phone: "",
  orders: [],
};
