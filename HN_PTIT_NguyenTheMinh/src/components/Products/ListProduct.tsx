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
  }

export default function ListProduct({ onAddProduct }: ListProductProps) {
  const [productListLocal, setProductListLocal] =
    useState<ProductType[]>(ProductData);
  const [productList, setProductList] = useState<ProductType[]>(() => {
    const products = localStorage.getItem("productList");
    return products ? JSON.parse(products) : [];
  });

  // Lưu dữ liệu lên local
  useEffect(() => {
    localStorage.setItem("productList", JSON.stringify(productListLocal));
  }, [productListLocal]);

  return (
    <div className="panel panel-primary">
      <div className="panel-heading">
        <h1 className="panel-title">List Products</h1>
      </div>
      <Products onAddProduct={onAddProduct} />
    </div>
  );
}
