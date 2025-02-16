import { v4 as uuid } from "uuid";

import { CustomerType } from "../new/customer.schema";

export const CustomerDefaultValues: CustomerType = {
  id: `customer-${uuid()}`,
  firstName: "",
  lastName: "",
  patronymic: undefined,
  email: "",
  phone: "",
  orders: [],
};
