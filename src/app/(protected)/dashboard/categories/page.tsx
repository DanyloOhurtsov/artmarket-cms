import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";
import CategoryList from "@/components/lists/category-list/category.list";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle title="Категорії" description="Список категорій">
        <Link href="/dashboard/categories/new" passHref>
          <Button>Створити категорію</Button>
        </Link>
      </PageTitle>

      <CategoryList />
    </section>
  );
};

export default CategoriesPage;
