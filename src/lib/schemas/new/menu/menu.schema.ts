import z from "zod";
import { v4 as uuid } from "uuid";
import { menuItemSchema, MenuItemType } from "./menu-item.schema";

export type MenuType = {
  id: string;
  title: string;
  handle: string;
  items: MenuItemType[];
};

export const menuSchema: z.ZodType<MenuType> = z.object({
  id: z.string() || `menu-${uuid()}`,
  title: z.string(),
  handle: z.string(),
  items: z.array(z.lazy(() => menuItemSchema)),
});
