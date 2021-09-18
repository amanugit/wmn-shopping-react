import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ProductNotFound.css";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_GET_BYFILTER_RESET,
} from "../../constants/productConstants";
import {listProducts, getSubCategory} from '../../actions/productActions';
function ProductNotFound({supCat, categoryQ}) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    dispatch({ type: PRODUCT_LIST_RESET });
    dispatch({ type: PRODUCT_GET_BYFILTER_RESET });
    if(categoryQ) {
      dispatch(getSubCategory(categoryQ, supCat));
      dispatch(listProducts(supCat, categoryQ));
    } else {
      dispatch(listProducts(supCat, ""));
    }
    const time = setTimeout(() => {
      setShowModal(false);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  
  }, [dispatch, supCat, categoryQ, showModal]);
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
