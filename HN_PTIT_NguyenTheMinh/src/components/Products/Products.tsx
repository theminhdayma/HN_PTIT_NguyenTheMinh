import React, { useState, useEffect } from "react";
import swal from "sweetalert";

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

interface ProductProps {
  onAddProduct: () => void;
  productListCart: ProductType[];
  setProductListCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
  productListLocal: ProductType[];
  setProductListLocal: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export default function Products({
  onAddProduct,
  productListCart,
  setProductListCart,
  productListLocal,
  setProductListLocal
}: ProductProps) {
  const handleClick = (product: ProductType) => {
    const showProductIndex = productListCart.findIndex(
      (item) => item.id === product.id
    );

    if (showProductIndex !== -1) {
      if (productListCart[showProductIndex].number < product.quantity) {
        const updatedProductListCart = [...productListCart];
        updatedProductListCart[showProductIndex].number++;
        const updatedProductListLocal = productListLocal.map((p) => {
          if (p.id === product.id) {
            return { ...p, quantity: p.quantity - 1 };
          }
          return p;
        });
        setProductListCart(updatedProductListCart);
        setProductListLocal(updatedProductListLocal);
        localStorage.setItem("productList", JSON.stringify(updatedProductListLocal));
      } else {
        swal("Số lượng sản phẩm đã hết !!! ");
        return;
      }
    } else {
      const updatedProductListCart = [
        ...productListCart,
        { ...product, number: 1, quantity: product.quantity - 1 },
      ];
      const updatedProductListLocal = productListLocal.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      });
      setProductListCart(updatedProductListCart);
      setProductListLocal(updatedProductListLocal);
      localStorage.setItem("productList", JSON.stringify(updatedProductListLocal));
    }

    // Hiển thị modal
    onAddProduct();
  };

  useEffect(() => {
    localStorage.setItem("productListCart", JSON.stringify(productListCart));
  }, [productListCart]);

  return (
    <div className="panel-body" id="list-product">
      {productListLocal.map((product: ProductType) => (
        <div key={product.id}>
          <div className="media product">
            <div className="media-left">
              <a href="#">
                <img
                  className="media-object"
                  src={product.img}
                  alt={product.name}
                />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{product.name}</h4>
              <p>{product.introduce}</p>
              <button
                onClick={() => handleClick(product)}
                style={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: product.quantity < 2 ? "red" : "green",
                  color: "white",
                  fontSize: "18px",
                  border: 0,
                  cursor: "pointer",
                }}
                disabled={product.quantity === 0}
              >
                {product.price} USD
              </button>
              <span
                style={{
                  backgroundColor: "LightGray",
                  cursor: "pointer",
                  color: "black",
                }}
                className="price"
              >
                {product.quantity} sản phẩm
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
