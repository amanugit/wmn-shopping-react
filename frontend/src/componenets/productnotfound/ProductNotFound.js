import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
function ProductNotFound({ supCat, categoryQ, history }) {

  const [showModal, setShowModal] = useState(true);
  useEffect(() => {
    function loader() {
      const chValue = Math.random();
      if (categoryQ) {
        history.push(`/${supCat}/${categoryQ}?ch=${chValue}`);
      } else {
        history.push(`/${supCat}?ch=${chValue}`);
      }
    }
    
    const time = setTimeout(() => {
      setShowModal(false);
    }, 2000);
    loader();
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
