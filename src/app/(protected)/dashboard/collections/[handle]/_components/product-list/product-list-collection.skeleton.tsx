const ProductListCollectionSkeleton = ({
  isEmpty = false,
}: {
  isEmpty?: boolean;
}) => {
  return (
    <>
      {isEmpty ? (
        <p>пусто</p>
      ) : (
        <>
          <div>Завантаження</div>
        </>
      )}
    </>
  );
};

export default ProductListCollectionSkeleton;
