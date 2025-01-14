// defaultValues.ts
export const defaultCategoryValues = {
  id: "",
  name: "",
  slug: "",
  shortDesc: "",
  description: "",
  parentId: null,
  image: "",
  children: [],
  products: [],
};

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
