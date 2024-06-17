import React, { useEffect } from "react";
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

interface ListCartProps {
  productListCart: ProductType[];
  setProductListCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export default function ListCart({
  productListCart,
  setProductListCart
}: ListCartProps) {
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
  }, [setProductListCart]);

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

        // Update productListLocal to increase the quantity in stock
        const storedProductList = localStorage.getItem("productList");
        const productListLocal = storedProductList ? JSON.parse(storedProductList) : [];
        const updatedProductListLocal = productListLocal.map((product: ProductType) => {
          if (product.id === productId) {
            return { ...product, quantity: product.quantity + productToDelete.number };
          }
          return product;
        });
        localStorage.setItem("productList", JSON.stringify(updatedProductListLocal));

        swal("Sản phẩm đã được xóa khỏi giỏ hàng!", {
          icon: "success",
        });
      } else {
        swal("Sản phẩm vẫn còn trong giỏ hàng!");
      }
    });
  };

  const handleUpdateProduct = (productId: number, newNumber: number) => {
    const productToUpdate = productListCart.find((product) => product.id === productId);

    if (!productToUpdate) {
      return;
    }

    const difference = newNumber - productToUpdate.number;

    const updatedProductListCart = productListCart.map((product) => {
      if (product.id === productId) {
        return { ...product, number: newNumber };
      }
      return product;
    });
    setProductListCart(updatedProductListCart);
    localStorage.setItem("productListCart", JSON.stringify(updatedProductListCart));

    // Update productListLocal to adjust the quantity in stock
    const storedProductList = localStorage.getItem("productList");
    const productListLocal = storedProductList ? JSON.parse(storedProductList) : [];
    const updatedProductListLocal = productListLocal.map((product: ProductType) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity - difference };
      }
      return product;
    });
    localStorage.setItem("productList", JSON.stringify(updatedProductListLocal));
  };

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        <h1 className="panel-title">Your Cart</h1>
      </div>
      <Cart
        productListCart={productListCart}
        onDeleteProduct={handleDeleteProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
}
