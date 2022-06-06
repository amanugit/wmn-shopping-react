import React from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFormCart } from "../../actions/cartActions";
import { FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

function Cart({ history }) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeCartHandler = (id) => {
    dispatch(removeFormCart(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <section className="cart_items" id="cart_items">
      <Container>
        <Row>
          <Col md={8} sm={12}>
            <ListGroup>
              {cartItems.length === 0 ? (
                <div className="my-2">
                  <h4>No Cart Item</h4>
                  <Link to="/women" className="mybtn">
                    Go to shopping
                  </Link>
                </div>
              ) : (
                <div>
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <img
                              src={item.photo}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                margin: "auto",
                              }}
                              alt={item.name}
                            ></img>
                          </Col>
                          <Col md={3}>
                            <Link
                              style={{
                                color: "black",
                                fontWeight: "bold",
                                textDecoration: "none",
                              }}
                              to={`/${item.superCat}/${item.name}/${item.productId}`}
                            >
                              <h5>{item.name}</h5>
                            </Link>
                          </Col>
                          <Col md={2}>
                            <p>$ {item.price}</p>
                          </Col>
                          <Col md={2}>
                            <Form.Control
                              as="select"
                              className="myselect"
                              value={item.qty}
                              onChange={(e) => {
                                dispatch(
                                  addToCart(
                                    item.productId,
                                    e.target.value,
                                    item.size,
                                    item.color
                                  )
                                );
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map((c) => {
                                return (
                                  <option key={c + 1} value={c + 1}>
                                    {c + 1}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Col>
                          <Col md={3} sm={12}>
                            <Button
                              variant="light"
                              className="removeCartBtn"
                              onClick={() => {
                                removeCartHandler(item.productId);
                              }}
                            >
                              <FaTrash></FaTrash>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                  <LinkContainer
                    to="/women"
                    title="Back to top"
                    className="mybtn mt-2"
                  >
                    <Button>Back to shopping</Button>
                  </LinkContainer>
                </div>
              )}
            </ListGroup>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup>
              <ListGroup.Item>
                <h2>
                  Sub Total:
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.qty),
                    0
                  )}{" "}
                  Items
                </h2>

                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="checkoutBtn my-3"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Cart;
