import Link from "next/link";

import { Button } from "@/components/ui/button";
import PageTitle from "@/components/page-title/page-title";
import CollectionsList from "@/components/lists/collections-list/collections-list";

const CollectionsPage = () => {
  return (
    <section className="w-full min-h-screen flex flex-col">
      <PageTitle
        title="Колекції"
        description="Список колекцій дозволяє переглядати, редагувати та видаляти колекції. Також можна створювати нові колекції для групування товарів."
      >
        <Link href="/dashboard/collections/new" passHref>
          <Button>Створити колекцію</Button>
        </Link>
      </PageTitle>

      <CollectionsList />
    </section>
  );
};

export default CollectionsPage;
