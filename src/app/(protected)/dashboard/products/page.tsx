import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";

const ProductsPage = () => {
  return (
    <section className="w-full min-h-screen">
      <PageTitle title="Продукти">
        <Link href="/dashboard/products/new" passHref>
          <Button>Створити продукт</Button>
        </Link>
      </PageTitle>
    </section>
  );
};

export default ProductsPage;
