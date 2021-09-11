import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ProductNotFound.css";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_GET_BYFILTER_RESET,
} from "../../constants/productConstants";
function ProductNotFound() {
  const dispatch = useDispatch();
  dispatch({ type: PRODUCT_LIST_RESET });
  dispatch({ type: PRODUCT_GET_BYFILTER_RESET });
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setShowModal(false);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <div className="notfound" id="notfound">
      <div
        className={
          showModal ? "modalShown modalnotfound" : "modalHidden modalnotfound"
        }
      >
        <div className="notfoundContainer">
          <div>
            {" "}
            <h1 style={{ fontSize: "2rem" }}>Not Found</h1>
            <p>viewing all products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNotFound;
