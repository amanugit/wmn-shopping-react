import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import { withRouter } from "react-router-dom";
import {listProducts, getSubCategory, getProductsByFilter, getProductsByFilterCat} from '../../actions/productActions';
function ProductNotFound({ supCat, categoryQ, history }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    function loader() {
      const chValue = Math.random();
      if (categoryQ) {
        // history.push(`/${supCat}/${categoryQ}?ch=${chValue}`);
        dispatch(getSubCategory(categoryQ, supCat));
        dispatch(listProducts(supCat, categoryQ));
        getProductsByFilterCat(supCat, "", "", "", "", "", categoryQ, "", "", "", 10);
      } else {
        // history.push(`/${supCat}?ch=${chValue}`);
        dispatch(listProducts(supCat, ""));
        getProductsByFilter(supCat, "", "", "", "", "", "", "", "", "", 10);
      }
    }
    loader();
    const time = setTimeout(() => {
      setShowModal(false);
    }, 2000);
    
    return () => {
      clearTimeout(time);
    };
    
  }, [categoryQ, supCat]);
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
