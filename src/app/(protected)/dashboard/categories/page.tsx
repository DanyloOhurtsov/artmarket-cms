import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title";
import CategoryList from "@/components/lists/category-list/category.list";

const CategoriesPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle title="Категорії" description="Список категорій">
        <Button>Створити категорію</Button>
      </PageTitle>

      <CategoryList />
    </section>
  );
};

export default CategoriesPage;
