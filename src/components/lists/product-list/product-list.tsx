import { ProductType } from "@/lib/schemas/new/product.schema";
import React from "react";

interface ProductListProps {
  products: ProductType[];
}
const ProductList = ({ products }: ProductListProps) => {
  return <div>ProductList</div>;
};

export default ProductList;
