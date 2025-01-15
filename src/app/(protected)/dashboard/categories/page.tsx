import LinkButton from "@/components/buttons/link.button";
import PageTitle from "@/components/page-title/page-title";
import CategoryList from "@/components/lists/category-list/category.list";

const CategoriesPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle title="Категорії" description="Список категорій">
        <LinkButton
          label="Створити категорію"
          href="/dashboard/categories/new"
        />
      </PageTitle>

      <CategoryList />
    </section>
  );
};

export default CategoriesPage;
