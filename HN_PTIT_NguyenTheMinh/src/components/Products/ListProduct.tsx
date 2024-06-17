import React, { useEffect, useState } from "react";
import Products from "./Products";
import ProductData from "./Product.json";

interface ProductType {
  id: number;
  name: string;
  img: string;
  introduce: string;
  quantity: number;
  price: number;
  number: number;
  status: boolean;
}

interface ListProductProps {
  onAddProduct: () => void;
  productListCart: ProductType[];
  setProductListCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export default function ListProduct({
  onAddProduct,
  productListCart,
  setProductListCart
}: ListProductProps) {
  const [productListLocal, setProductListLocal] =
    useState<ProductType[]>(() => {
      const storedProductList = localStorage.getItem("productList");
      return storedProductList ? JSON.parse(storedProductList) : ProductData;
    });

  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productListLocal));
  }, [productListLocal]);

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h1 className="panel-title">List Products</h1>
      </div>
      <Products
        onAddProduct={onAddProduct}
        productListCart={productListCart}
        setProductListCart={setProductListCart}
        productListLocal={productListLocal}
        setProductListLocal={setProductListLocal}
      />
    </div>
  );
}
