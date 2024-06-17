import React, { useState } from "react";

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

interface Props {
  productListCart: ProductType[];
  onDeleteProduct: (productId: number) => void;
  onUpdateProduct: (productId: number, newNumber: number) => void;
}

export default function Cart({ productListCart, onDeleteProduct, onUpdateProduct }: Props) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    productListCart.reduce((acc, product) => {
      acc[product.id] = product.number;
      return acc;
    }, {} as { [key: number]: number })
  );

  const handleQuantityChange = (productId: number, newNumber: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newNumber,
    }));
  };

  const handleUpdateClick = (productId: number) => {
    onUpdateProduct(productId, quantities[productId]);
  };

  const totalQuantity = productListCart.reduce(
    (total, product) => total + product.number,
    0
  );

  return (
    <div className="panel-body">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: "4%" }}>STT</th>
            <th>Name</th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "4%" }}>Quantity</th>
            <th style={{ width: "25%" }}>Action</th>
          </tr>
        </thead>
        <tbody id="my-cart-body">
          {productListCart.map((product, index) => (
            <tr key={product.id}>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.price} USD</td>
              <td>
                <input
                  name={`cart-item-quantity-${product.id}`}
                  type="number"
                  value={quantities[product.id]}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                />
              </td>
              <td>
                <a
                  className="label label-info update-cart-item"
                  data-product={product.id}
                  onClick={() => handleUpdateClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  Update
                </a>
                <a
                  className="label label-danger delete-cart-item"
                  data-product={product.id}
                  onClick={() => onDeleteProduct(product.id)}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot id="my-cart-footer">
          <tr>
            <td colSpan={4}>
              {totalQuantity > 0 ? (
                <span>
                  Có <b>{totalQuantity}</b> sản phẩm trong giỏ hàng
                </span>
              ) : (
                "Chưa có sản phẩm trong giỏ hàng"
              )}
            </td>
            <td colSpan={2} className="total-price text-left">
              {productListCart.reduce(
                (total, product) => total + product.price * product.number,
                0
              )}
              USD
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
