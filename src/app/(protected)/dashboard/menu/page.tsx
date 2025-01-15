import PageTitle from "@/components/page-title/page-title";
import LinkButton from "@/components/buttons/link.button";

const MenusPage = async () => {
  return (
    <section>
      <PageTitle
        title="Меню"
        description="Ця сторінка дозволяє переглядати список усіх меню (навігаційних елементів) з їх ієрархією. Ви можете створювати, редагувати та видаляти меню або їх дочірні пункти для організації навігації на сайті."
      >
        <LinkButton label="Створити меню" href="/dashboard/menu/new" />
      </PageTitle>
    </section>
  );
};

export default MenusPage;
