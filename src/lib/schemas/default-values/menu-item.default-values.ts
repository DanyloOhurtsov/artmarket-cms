import { MenuItemType } from "../new/menu/menu-item.schema";
import { MenuDefaultValues } from "./menu.default-values";

export const MenuItemDefaultValues: MenuItemType = {
  id: "",
  title: "",
  handle: "",
  menuId: "",
  menu: MenuDefaultValues,
  collectionId: undefined,
  collection: undefined,
  parentId: undefined,
  parent: undefined,
  children: [],
};
