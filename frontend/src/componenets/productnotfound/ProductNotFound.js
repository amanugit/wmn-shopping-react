import React, { useEffect, useState } from "react";
import {getProductsByFilter, getProductsByFilterCat, listProducts, getSubCategory } from '../../actions/productActions';
import { useDispatch } from "react-redux";
import { PRODUCT_GET_CAT_BYFILTER_RESET, PRODUCT_GET_BYFILTER_RESET, GET_PRODUCT_SUBCATEGORY_RESET, PRODUCT_LIST_RESET } from "../../constants/productConstants";
import { withRouter } from "react-router-dom";
function ProductNotFound({ supCat, categoryQ, history }) {
  const dispatch = useDispatch();
  /**
   * modal was displayed
   */
  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    function loader() {
      if (categoryQ) {
        dispatch({type: PRODUCT_GET_CAT_BYFILTER_RESET});
        dispatch({type: PRODUCT_GET_BYFILTER_RESET});
        dispatch({type: GET_PRODUCT_SUBCATEGORY_RESET});
        dispatch({type: PRODUCT_LIST_RESET});
     
        history.push(`/${supCat}/${categoryQ}`);
      } else {
        dispatch({type: PRODUCT_GET_CAT_BYFILTER_RESET});
        dispatch({type: PRODUCT_GET_BYFILTER_RESET});
        dispatch({type: GET_PRODUCT_SUBCATEGORY_RESET});
        dispatch({type: PRODUCT_LIST_RESET});
        history.push(`/${supCat}`);
      }
    }
    
    const time = setTimeout(() => {
      setShowModal(false);
    }, 2000);
    loader();
    return () => {
      clearTimeout(time);
    };
    
  }, [history]);
  return (
    <div className={
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

export default withRouter(ProductNotFound);
