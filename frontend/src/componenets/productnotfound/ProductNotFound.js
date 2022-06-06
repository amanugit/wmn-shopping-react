import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_GET_BYFILTER_RESET,
} from "../../constants/productConstants";
import { listProducts, getSubCategory } from "../../actions/productActions";
function ProductNotFound({ supCat, categoryQ }) {
  const dispatch = useDispatch();
  /**
   * modal was displayed
   */
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    /**
     * dispatch
     */
     if (categoryQ) {
      dispatch(getSubCategory(categoryQ, supCat));
      dispatch(listProducts(supCat, categoryQ));
    } else {
      dispatch(listProducts(supCat, ""));
    }
    const time = setTimeout(() => {
      setShowModal(false);
    }, 2000);

 
    /**
     * set modal false
     */

    /**
     * some clean-up
     */
    return () => {
      clearTimeout(time);
    };
  }, [dispatch, supCat, categoryQ]);
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
            <p>Clering All Filters And viewing all products ....</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNotFound;
