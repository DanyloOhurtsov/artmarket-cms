import { CollectionType } from "@/lib/schemas/new/collection.schema";
import ProductList from "@/components/lists/product-list/product-list";
import ProductListCollectionSkeleton from "./product-list-collection.skeleton";

const ProductListCollection = ({
  data,
}: {
  data: CollectionType | undefined;
}) => {
  if (!data) return <ProductListCollectionSkeleton />;
  if (!data.products) return <ProductListCollectionSkeleton isEmpty />;

  return (
    <div className="w-3/4 p-4">
      {data.products && data.products.length > 0 ? (
        <ProductList products={data.products} />
      ) : (
        "Товарів не знайдено"
      )}
    </div>
  );
};

export default ProductListCollection;
