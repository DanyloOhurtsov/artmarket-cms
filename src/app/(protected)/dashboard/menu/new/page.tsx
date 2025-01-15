import PageTitle from "@/components/page-title/page-title";

const NewMenuPage = () => {
  return (
    <section>
      <PageTitle
        title="Нове меню"
        description="Ця сторінка дозволяє створювати нове меню (навігаційний елемент) для організації навігації на сайті."
        isPrevios
      />

      <div className="p-4">
        {/* <MenuBuilder /> */}
      </div>
    </section>
  );
};

export default NewMenuPage;
