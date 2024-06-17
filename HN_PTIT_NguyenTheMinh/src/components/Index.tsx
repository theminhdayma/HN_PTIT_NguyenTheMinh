import React, { useState, useEffect } from "react";
import ModalAdded from "./Modal/ModalAdded";
import ListProduct from "./Products/ListProduct";
import ListCart from "./Cart/ListCart";
import ModalUpdated from "./Modal/ModalUpdated";

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

export default function Index() {
  const [added, setAdded] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const [productListCart, setProductListCart] = useState<ProductType[]>(() => {
    const storedProductListCart = localStorage.getItem("productListCart");
    return storedProductListCart ? JSON.parse(storedProductListCart) : [];
  });

  const handleAddProduct = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  useEffect(() => {
    localStorage.setItem("productListCart", JSON.stringify(productListCart));
  }, [productListCart]);

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <ListProduct
            onAddProduct={handleAddProduct}
            productListCart={productListCart}
            setProductListCart={setProductListCart}
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <ListCart
            productListCart={productListCart}
            setProductListCart={setProductListCart}
          />
          {added && <ModalAdded />}
          {updated && <ModalUpdated />}
        </div>
      </div>
    </div>
  );
}
