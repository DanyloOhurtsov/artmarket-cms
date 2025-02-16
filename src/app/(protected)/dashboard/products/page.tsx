"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";
import ProductList from "@/components/lists/product-list/product-list";
import useSWR from "swr";
import { fetcher } from "@/lib/functions/fetcher";

const ProductsPage = () => {
  const { data, isLoading, error } = useSWR("/api/products", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error</div>;
  }
  return (
    <section className="w-full min-h-screen">
      <PageTitle title="Продукти">
        <Link href="/dashboard/products/new" passHref>
          <Button>Створити продукт</Button>
        </Link>
      </PageTitle>

      <ProductList products={data} />
    </section>
  );
};

export default ProductsPage;
