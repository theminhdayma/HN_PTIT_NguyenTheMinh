import React, { useState, useEffect } from "react";
import productList from "./Product.json";
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
}

export default function Products({ onAddProduct }: ProductProps) {
  const [colorAdd, setColorAdd] = useState<boolean>(false);
  const [productListCart, setProductListCart] = useState<ProductType[]>(() => {
    const storedProductListCart = localStorage.getItem("productListCart");
    return storedProductListCart ? JSON.parse(storedProductListCart) : [];
  });

  const handleClick = (product: ProductType) => {
    const showProductIndex = productListCart.findIndex(
      (item) => item.id === product.id
    );

    if (showProductIndex !== -1) {
      if (productListCart[showProductIndex].number < product.quantity) {
        const updatedProductListCart = [...productListCart];
        updatedProductListCart[showProductIndex].number++;
        updatedProductListCart[showProductIndex].quantity--;
        setProductListCart(updatedProductListCart);
      } else {
        swal("Số lượng sản phẩm đã hết !!! ");
        return;
      }
    } else {
      const updatedProductListCart = [
        ...productListCart,
        { ...product, number: 1 },
      ];
      setProductListCart(updatedProductListCart);
    }

    // Hiển thị modal
    onAddProduct();
  };

  //Lưu lên local
  useEffect(() => {
    localStorage.setItem("productListCart", JSON.stringify(productListCart));
  }, [productListCart]);

  return (
    <div className="panel-body" id="list-product">
      {productList.map((product: ProductType) => (
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
                  backgroundColor: product.quantity === 1 ? "red" : "green",
                  color: "white",
                  border: 0,
                  cursor: "pointer",
                }}
                disabled={product.quantity === 0}
              >
                ADD CART
              </button>
              <span
                style={{
                  backgroundColor: "LightGray",
                  cursor: "pointer",
                  color: "black",
                }}
                className="price"
              >
                {product.price} USD
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
