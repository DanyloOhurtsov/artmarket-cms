// defaultValues.ts

// Category
export const defaultCategoryValues = {
  id: "",
  name: "",
  slug: "",
  shortDesc: "",
  description: "",
  image: "",
  products: [],
};

// Menu
export const defaultMenuItemValues = {
  id: "",
  name: "",
  order: 1,
  parentId: null,
  categoryId: null,
  children: [],
};

// Product
export const defaultProductValues = {
  id: "",
  name: "",
  slug: "",
  description: "",
  shortDesc: "",
  minOrder: 1,
  maxOrder: 100,
  stock: 1,
  price: 0,
  isActive: true,
  category: defaultCategoryValues,
  images: [],
  variants: [],
};
