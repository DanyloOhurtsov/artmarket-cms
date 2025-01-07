import NewProductForm from "@/components/forms/new-product-form/new-product.form";

const NewProductPage = () => {
  return (
    <>
      <section className="w-full min-h-screen flex justify-center items-center">
        <div className="w-1/2">
          <NewProductForm />
        </div>
      </section>
    </>
  );
};

export default NewProductPage;
