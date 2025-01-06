import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <section className="w-full min-h-screen p-8">
      <div className="flex justify-between items-center bg-slate-100 p-2 rounded-md">
        <h1>Products</h1>
        <Button>
          <Link href="/dashboard/products/new">Створити продукт</Link>
        </Button>
      </div>
    </section>
  );
};

export default ProductsPage;
