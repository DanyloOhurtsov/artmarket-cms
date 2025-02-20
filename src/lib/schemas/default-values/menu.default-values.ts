import { v4 as uuid } from "uuid";

import { MenuType } from "../new/menu/menu.schema";

export const MenuDefaultValues: MenuType = {
  id: `menu-${uuid()}`,
  title: "",
  handle: "",
  items: [],
};
