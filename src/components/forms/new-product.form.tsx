"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";

const formSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  description: z.string().min(3).max(1000).optional(),
  shortDesc: z.string().min(3).max(100).optional(),
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
    .object({
      url: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  variants: z.object({
    name: z.string(),
    slug: z.string(),

    description: z.string().optional(),
    shortDesc: z.string().optional(),
  }),
});

const NewProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDesc: "",
      minOrder: 1,
      maxOrder: undefined,
      price: 0,
      stock: 0,
      isActive: true,
      category: {
        id: "",
        name: "",
      },
      images: {
        url: "",
        alt: "",
      },
    },
  });

  const handleGenerateClick = () => {
    if (form.getValues().name !== "") {
      const slug = generateRandomSlug({
        stringToGenerate: form.getValues().name,
      });

      form.setValue("slug", slug);
    } else {
      alert("Будь ласка, введіть назву товару");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва товару</FormLabel>
              <FormControl>
                <Input placeholder="Чорні олівці з коробкою" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>
                  Slug (Назва товару у латинській транслітерації через дефіс)
                </FormLabel>
                <Button variant={"link"} onClick={handleGenerateClick}>
                  Рандомний Slug
                </Button>
              </div>
              <FormControl>
                <Input placeholder="black-pencils-with-case" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Опис товару</FormLabel>
              <FormControl>
                <Input placeholder="Чорні олівці з коробкою" {...field} type='text' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewProductForm;
