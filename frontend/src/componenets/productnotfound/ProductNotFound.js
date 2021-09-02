import React, { useEffect, useState } from "react";
import "./ProductNotFound.css";
function ProductNotFound() {
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
