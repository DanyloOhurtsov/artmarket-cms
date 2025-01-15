import LinkButton from "@/components/buttons/link.button";
import PageTitle from "@/components/page-title/page-title";

const MenuPage = async () => {
  return (
    <section>
      <PageTitle title="Меню" isPrevios={true}>
        <LinkButton
          label="Редагувати"
          href={`/dashboard/menu/edit/${"PASTE_MENU_ID"}`}
          variant={"secondary"}
        />
      </PageTitle>
    </section>
  );
};

export default MenuPage;
