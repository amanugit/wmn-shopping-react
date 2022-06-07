import React, { useEffect, useState } from "react";
import {getProductsByFilter, getProductsByFilterCat, listProducts, getSubCategory } from '../../actions/productActions';
import { useDispatch } from "react-redux";
import {
  PRODUCT_LIST_RESET,
  PRODUCT_GET_BYFILTER_RESET,
} from "../../constants/productConstants";
function ProductNotFound({ supCat, categoryQ, history }) {
  const dispatch = useDispatch();
  /**
   * modal was displayed
   */
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    function loader() {
      if (categoryQ) {
        dispatch(getSubCategory(categoryQ, supCat));
        dispatch(listProducts(supCat, categoryQ));
        getProductsByFilterCat(supCat, "", "", "", "", "", categoryQ, "", "", "", "");
        history.push(`/${supCat}/${categoryQ}`);
      } else {
        dispatch(listProducts(supCat, ""));
        dispatch(
          getProductsByFilter(supCat, "", "", "", "", "", "", "", "", "", 10)
        );
        history.push(`/${supCat}`);
      }
    }
    const time = setTimeout(() => {
      loader();
      setShowModal(false);
    }, 2000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  return (
    <div
      className={
        showModal ? "modalnotfound modalShown" : "modalnotfound modalHidden"
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

  );
}

export default ProductNotFound;
