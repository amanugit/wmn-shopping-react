import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import "./ProductDetail.css";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
function ProductDetail({ match }) {
  const productId = match.params.id;
  const productGet = useSelector((state) => state.productGet);
  const { loading, product, relatedProducts, error } = productGet;
  const [qty, setQty] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const imgRefs = useRef([]);
  const mainImgRef = useRef(null);

  const wordlist = (senetenece) => {
    const sent = String(senetenece);
    return sent.split(". ");
  };

  const clickImage = (imgIndex) => {
    imgRefs.current.map((imgref) => {
      return (imgref.style.boxShadow = "none");
    });
    imgRefs.current[imgIndex].style.boxShadow = "0 4px 8px 0 #c06d00";
    mainImgRef.current.src = imgRefs.current[imgIndex].src;
  };

  const addToBag = () => {
    if (qty === "") {
      alert("please choose quantity");
    } else if (color === "") {
      alert("Please choose color");
    } else if (size === "") {
      alert("please choose size");
    } else {
      dispatch(addToCart(productId, qty, size, color));
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, match, productId]);
  return (
    <section className="product-detail">
      <Container>
        {loading ? (
          <div className="spinner">
            <Spinner
              animation="border"
              size="lg"
              variant="light"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            Opps: something went wrong..., try to reload the page
          </Alert>
        ) : (
          <Row className="product-detail-container">
            <Col md={9} sm={12}>
              <Row>
                <Col
                  className="product_detail_scroll"
                  md={6}
                  sm={12}
                  style={{
                    height: "400px",
                    overflowY: "scroll",
                  }}
                >
                  {product.images.map((img, index) => {
                    return (
                      <Row key={index}>
                        <Col sm={12} md={12} style={{ marginBottom: "20px" }}>
                          <img
                            className="img img-item"
                            ref={(el) => (imgRefs.current[index] = el)}
                            src={`${img}`}
                            alt={product.name}
                            onClick={() => clickImage(index)}
                          ></img>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
                <Col md={6} sm={12}>
                  <img
                    className=" img"
                    ref={(el) => (mainImgRef.current = el)}
                    src={`${product.photo}`}
                    alt={product.name}
                    style={{
                      height: "400px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  ></img>
                </Col>
              </Row>
            </Col>

            <Col md={3} sm={12}>
              <h2>{product.name}</h2>
              <h3>Price: {product.price}</h3>
              <ul>
                {wordlist(product.desc).map((descList, index) => {
                  return <li key={index}>{descList}</li>;
                })}
              </ul>
              <p>Shipping Cost: {product.shippingCost} $</p>
              <div className="colors">
                <p>Available Colors</p>
                <Form.Control
                  as="select"
                  className="myselect"
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                >
                  <option value="">Select Colors</option>
                  {product.color.map((color, index) => {
                    return (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    );
                  })}
                </Form.Control>
              </div>

              <div className="sizes">
                <p>Available Sizes</p>
                <Form.Control
                  as="select"
                  className="myselect"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
                  <option value="">Select Size</option>
                  {product.sizes.map((size) => {
                    return <option value={size}>{size}</option>;
                  })}
                </Form.Control>
              </div>

              <div className="sizes">
                <p>Count In Stock</p>
                <Form.Control
                  as="select"
                  className="myselect"
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  <option value="">Enter quality</option>
                  {product.countInStock > 0
                    ? [...Array(product.countInStock).keys()].map((c) => {
                        return (
                          <option key={c + 1} value={c + 1}>
                            {c + 1}
                          </option>
                        );
                      })
                    : "Not Avialble"}
                </Form.Control>
              </div>
              <Button
                className="mybtn mr-5"
                onClick={addToBag}
                disabled={product.countInStock <= 0}
              >
                {product.countInStock <= 0 ? (
                  "Not Availeble"
                ) : (
                  <FaCartPlus></FaCartPlus>
                )}
              </Button>
              <Link to={`/${product.superCat}`}>
                <Button className=" mybtn">Back to shop</Button>
              </Link>
            </Col>
          </Row>
        )}
      </Container>
      <Container>
        <Row>
          {product && relatedProducts.length > 0 && (
            <h4 className="my-3 text-center">You migh also like</h4>
          )}
          {product
            ? relatedProducts.length > 0
              ? relatedProducts.map((rp) => {
                  return (
                    <Col md={3} sm={12} className="mb-2">
                      <div className="p-3 shadow">
                        <Link to={`/${rp.superCat}/${rp.name}/${rp._id}`}>
                          <img
                            src={`${rp.photo}`}
                            alt={rp.name}
                            className="img-fluid"
                          ></img>
                        </Link>
                        <div className="my-2">
                          <Link to={`/${rp.superCat}/${rp.name}/${rp._id}`}>
                            <h6>{rp.name}</h6>
                          </Link>
                          <h6 className="text-dark">{rp.desc.substr(0, 20)}</h6>
                          <h5>$ {rp.price}</h5>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : ""
            : ""}
        </Row>
      </Container>
    </section>
  );
}

export default ProductDetail;
