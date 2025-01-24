import z from "zod";
import { v4 as uuid } from "uuid";
import { menuSchema, MenuType } from "./menu.schema";
import { collectionSchema, CollectionType } from "../collection.schema";

export type MenuItemType = {
  id: string;
  title: string;
  handle: string;

  menuId: string;
  menu: MenuType;

  collectionId?: string;
  collection?: CollectionType;

  parentId?: string;
  parent?: MenuItemType;
  children?: MenuItemType[];
};

export const menuItemSchema: z.ZodType<MenuItemType> = z.lazy(() =>
  z.object({
    id: z.string() || `menu-item-${uuid()}`,
    title: z.string(),
    handle: z.string(),

    menuId: z.string(),
    menu: z.lazy(() => menuSchema),

    collectionId: z.string().optional(),
    collection: z.lazy(() => collectionSchema).optional(),

    parentId: z.string().optional(),
    parent: menuItemSchema.optional(),
    children: z.array(z.lazy(() => menuItemSchema)).default([]),
  })
);
