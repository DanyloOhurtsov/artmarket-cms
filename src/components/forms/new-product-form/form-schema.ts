import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Назва товару повинна містити мінімум 3 символи",
    })
    .max(100, {
      message: "Назва товару повинна містити максимум 100 символів",
    }),
  slug: z
    .string()
    .min(3, {
      message: "Slug повинен містити мінімум 3 символи",
    })
    .max(120, {
      message: "Slug повинен містити максимум 120 символів",
    }),
  shortDesc: z.string().max(100),
  description: z.string().max(1000),
  minOrder: z.number().int().positive().optional().default(1),
  maxOrder: z.number().int().positive().optional(),
  price: z.number().positive(),
  stock: z.number().int().positive().optional().default(0),
  isActive: z.boolean().default(true),

  // Nested object
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  images: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string().optional(),
      })
    )
    .min(1, "Додайте хоча б одне зображення")
    .max(10, "Не більше 10 зображень")
    .optional(),
  variants: z
    .array(
      z.object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        shortDesc: z.string().optional(),
      })
    )
    .optional(),
});

export const defaultValues: z.infer<typeof formSchema> = {
  name: "",
  slug: "",
  description: "",
  shortDesc: "",
  minOrder: 1,
  maxOrder: undefined,
  price: 0,
  stock: 1,
  isActive: true,
  category: {
    id: "",
    name: "",
  },
  images: [
    {
      url: "",
      alt: "",
    },
  ],
  variants: [
    {
      name: "",
      slug: "",
      description: "",
      shortDesc: "",
    },
  ],
};
