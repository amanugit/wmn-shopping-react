import React, { useEffect } from "react";
import "./ViewProduct.css";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../actions/productActions";
import { FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";

function ViewProduct({ match, history }) {
  const productId = match.params.id;
  const productGet = useSelector((state) => state.productGet);
  const { loading, product, error } = productGet;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/admin/login?redirect=/admin/product/${productId}`);
    }
    dispatch(getProduct(productId));
  }, [productId, dispatch, userInfo, history]);
  return (
    <div className="admin_view_product" id="admin_view_product">
      <Container>
        <div className="my-2">
          <Link to="/admin/products">
            <FaBackward
              title="Go to back"
              style={{ fontSize: "2rem", color: "#c06d00" }}
            ></FaBackward>
          </Link>
        </div>
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
          <div>Error</div>
        ) : (
          <Row>
            <Col md={3} sm={12}>
              <Row>
                <Col
                  md={12}
                  sm={12}
                  className="d-flex flex-column justify-content-start"
                >
                  <img
                    className=" rounded-circle"
                    src={`/uploads/img/${product.photo}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    alt={product.name}
                  ></img>

                  <h4 className="my-2 ">{product.name}</h4>
                  <h3 className="my-2 ">{product.countInStock} Items Left</h3>
                </Col>
              </Row>
            </Col>
            <Col md={9} sm={12}>
              <Row>
                <Col md={6} sm={12}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>Price</h6>
                      <p>${product.price}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Category</h6>
                      <p>${product.superCat}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Sub Category</h6>
                      <p>${product.subCat}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Item Category</h6>
                      <p>${product.itemCat}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Brand</h6>
                      <p>${product.brand}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Materials Made</h6>
                      <p>${product.material}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6} sm={12}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>Shipping Cost</h6>
                      <p>${product.shippingCost}</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Available Colors</h6>
                      <p>
                        {product.color > 0
                          ? product.color.map((color, index) => {
                              return (
                                <span key={index} style={{ padding: "1rem" }}>
                                  {color}
                                </span>
                              );
                            })
                          : " Not avialble"}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Avaialble Clothing Sizes</h6>
                      <p>
                        {product.sizes.length > 0
                          ? product.sizes.map((size, index) => {
                              return (
                                <span key={index} style={{ padding: "1rem" }}>
                                  {size}
                                </span>
                              );
                            })
                          : "Not avaialble"}
                      </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Avialbe Shoe sizes</h6>
                      <p>
                        {product.shoeSize.length > 0
                          ? product.shoeSize.map((ssize, index) => {
                              return (
                                <span key={index} style={{ padding: "1rem" }}>
                                  {ssize}
                                </span>
                              );
                            })
                          : " Not available "}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="my-3">
                    {product.images.length > 0
                      ? product.images.map((img, index) => {
                          return (
                            <img
                              key={index}
                              src={`/uploads/imgs/${img}`}
                              style={{
                                width: "70px",
                                height: "70px",
                                borderRadius: "100%",
                              }}
                              alt={product.name}
                            ></img>
                          );
                        })
                      : " Not available "}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default ViewProduct;
