import React, { useState } from "react";
import ModalAdded from "./Modal/ModalAdded";
import ListProduct from "./Products/ListProduct";
import ListCart from "./Cart/ListCart";
import ModalUpdated from "./Modal/ModalUpdated";

export default function Index() {
  const [added, setAdded] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const handleAddProduct = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <ListProduct onAddProduct={handleAddProduct} />
          </div>
        </div>
        <div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <ListCart />
            {added && <ModalAdded />}
            {updated && <ModalUpdated />}
          </div>
        </div>
      </div>
    </div>
  );
}
