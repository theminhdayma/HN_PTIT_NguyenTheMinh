import React, { useState, useEffect } from "react";
import Cart from "./Cart";
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

export default function ListCart() {
  const [productListCart, setProductListCart] = useState<ProductType[]>(() => {
    const products = localStorage.getItem("productListCart");
    return products ? JSON.parse(products) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedProductListCart = localStorage.getItem("productListCart");
      setProductListCart(
        storedProductListCart ? JSON.parse(storedProductListCart) : []
      );
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDeleteProduct = (productId: number) => {
    const productToDelete = productListCart.find(
      (product) => product.id === productId
    );

    if (!productToDelete) {
      return;
    }

    swal({
      title: `Bạn có chắc chắn muốn xóa ${productToDelete.name} không?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedProductListCart = productListCart.filter(
          (product) => product.id !== productId
        );
        setProductListCart(updatedProductListCart);
        localStorage.setItem(
          "productListCart",
          JSON.stringify(updatedProductListCart)
        );
        swal("Sản phẩm đã được xóa khỏi giỏ hàng!", {
          icon: "success",
        });
      } else {
        swal("Sản phẩm vẫn còn trong giỏ hàng!");
      }
    });
  };

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        <h1 className="panel-title">Your Cart</h1>
      </div>
      <Cart
        productListCart={productListCart}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
}
