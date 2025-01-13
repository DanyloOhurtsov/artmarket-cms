import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <section className="w-full min-h-screen">
      <PageTitle title="Продукти" description="Список продуктів">
        <Button>
          <Link href="/dashboard/products/new">Створити продукт</Link>
        </Button>
      </PageTitle>
    </section>
  );
};

export default ProductsPage;
