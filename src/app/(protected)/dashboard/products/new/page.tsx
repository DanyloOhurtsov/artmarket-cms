import NewProductForm from "@/components/forms/new-product-form/new-product.form";

const NewProductPage = () => {
  return (
    <>
      <section className="w-full min-h-screen flex justify-center items-center">
        <div className="w-3/4">
          <NewProductForm />
        </div>
      </section>
    </>
  );
};

export default NewProductPage;
