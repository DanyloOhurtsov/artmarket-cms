"use client";

import { useEffect, useState } from "react";
import * as DialogComponent from "@/components/ui/dialog";
import { CollectionType } from "@/lib/schemas/new/collection.schema";
import { ProductType } from "@/lib/schemas/new/product.schema";
import { fetcher } from "@/lib/functions/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductList from "./_components/product-list";

interface AddProductsModalProps {
  collection: CollectionType;
  initialProducts: ProductType[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AddProductsModal = ({
  collection,
  initialProducts,
  isOpen,
  onOpenChange,
}: AddProductsModalProps) => {
  const {
    data: allProducts,
    error: productsError,
    isLoading: productsLoading,
  } = useSWR<ProductType[]>("/api/products", fetcher);

  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setSelectedProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleToggleProduct = (product: ProductType) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSave = async () => {
    const selectedIds = selectedProducts.map((p) => p.id);
    const res = await fetch(
      `/api/collections/${collection.id}/update-products`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds: selectedIds }),
      }
    );
    if (res.ok) {
      // Можна оновити стан колекції, перезавантажити дані тощо
      // Наприклад, викликати mutate() з SWR або показати повідомлення про успіх
      onOpenChange(!isOpen); // Якщо використовується модальне вікно з можливістю закриття
    } else {
      console.error("Failed to update collection products");
    }
  };

  return (
    <DialogComponent.Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogComponent.DialogTrigger asChild>
        <Button variant="outline">Додати товари</Button>
      </DialogComponent.DialogTrigger>

      <DialogComponent.DialogContent>
        <DialogComponent.DialogHeader>
          <DialogComponent.DialogTitle>
            Додати товари
          </DialogComponent.DialogTitle>
          <DialogComponent.DialogDescription>
            Виберіть товари для додавання в колекцію
          </DialogComponent.DialogDescription>
        </DialogComponent.DialogHeader>

        <Separator />

        <ProductList />

        <DialogComponent.DialogFooter>
          <DialogComponent.DialogClose asChild>
            <Button variant="secondary">Скасувати</Button>
          </DialogComponent.DialogClose>
          <Button variant="default">Додати</Button>
        </DialogComponent.DialogFooter>
      </DialogComponent.DialogContent>
    </DialogComponent.Dialog>
  );
};

export default AddProductsModal;
