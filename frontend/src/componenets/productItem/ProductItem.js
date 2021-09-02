import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductItem.css";
function ProductItem({ product }) {
  return (
    <Col md={3} sm={12} className="mb-2">
      <div className="p-3 shadow-sm p_item">
        <div className="hoverContainer">
          <p>Sizes</p>
          <ul>
            {product.subCat === "clothings"
              ? product.sizes.map((s, index) => {
                  return <li>{s}</li>;
                })
              : product.subCat === "shoes"
              ? product.shoeSize.map((s, index) => {
                  return <li>{s}</li>;
                })
              : ""}
          </ul>
        </div>
        <Link to={`/${product.superCat}/${product.name}/${product._id}`}>
          <img
            src={`${product.photo}`}
            alt={product.name}
            className="img-fluid"
          ></img>
        </Link>
        <div className="my-2">
          <Link to={`/${product.superCat}/${product.name}/${product._id}`}>
            <h6>{product.name}</h6>
          </Link>
          <h6 className="text-dark">{product.desc.substr(0, 20)}</h6>
          <h5>$ {product.price}</h5>
        </div>
      </div>
    </Col>
  );
}

export default ProductItem;
