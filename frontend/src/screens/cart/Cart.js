import React from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFormCart } from "../../actions/cartActions";
import { FaTrash } from "react-icons/fa";
import "./Cart.css";
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
                <h4>No Cart Item</h4>
              ) : (
                cartItems.map((item, index) => {
                  return (
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>
                          <img
                            src={item.photo}
                            style={{ width: "100%" }}
                            alt={item.name}
                          ></img>
                        </Col>
                        <Col md={2}>
                          <Link
                            style={{ color: "black", fontWeight: "bold" }}
                            to={`/${item.superCat}/${item.name}/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          <p>$ {item.price}</p>
                        </Col>
                        <Col md={3}>
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
                        <Col md={2} sm={12}>
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
                })
              )}
            </ListGroup>
          </Col>
          <Col md={4} sm={12}>
            <ListGroup>
              <ListGroup.Item>
                <h2>
                  Sub Total:
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
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
