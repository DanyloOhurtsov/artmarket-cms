"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";
import useSWR from "swr";
import { fetcher } from "@/lib/functions/fetcher";
import ProductList from "@/components/lists/product-list/product-list";

const ProductsPage = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/products", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Error</div>;

  return (
    <section className="w-full min-h-screen">
      <div className="sticky top-0 z-10 bg-white">
        <PageTitle title="Продукти">
          <Link href="/dashboard/products/new" passHref>
            <Button>Створити продукт</Button>
          </Link>
        </PageTitle>
      </div>

      <ProductList products={data} mutate={mutate} />
    </section>
  );
};

export default ProductsPage;
