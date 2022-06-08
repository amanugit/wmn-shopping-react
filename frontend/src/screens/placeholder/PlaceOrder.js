import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import { updateProductQty } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import { USER_DETAILS_RESET } from "../../constants/userConstants";

function PlaceOrder({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  /**
   * Assin  itemsPrice, taxPrice to the cart State
   */
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty + item.shippingCost,
      0
    )
  );
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      cart.cartItems.map((c) => {
        dispatch(updateProductQty(c.productId, c.qty));
      });
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
      localStorage.removeItem("cartItems");
    }
  }, [history, success, order, cart, dispatch]);
  return (
    <section className="placeorder" id="placeorder">
      <Container>
        <Row>
          <Col md={8} sm={12}>
            <ListGroup>
              <ListGroup.Item className="mb-4 shadow-sm">
                <h2 className="my-2 p-2 text-center" style={{background: '#ddd', color: 'black'}}>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}
                </p>
                <p>
                  <strong>City: </strong>
                  {cart.shippingAddress.city}{" "}
                </p>
                <p>
                  <strong>Postal Code: </strong>
                  {cart.shippingAddress.postalCode}
                </p>
                <p>
                  <strong>Country: </strong>
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item className="mb-4 shadow-sm">
              <h2 className="my-2 p-2 text-center" style={{background: '#ddd', color: 'black'}}>Payment Method</h2>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item className="mb-4 shadow-sm">
              <h2 className="my-2 p-2 text-center" style={{background: '#ddd', color: 'black'}}>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Alert variant="danger">No Cart Items</Alert>
                ) : (
                  cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item>
                        <Row>
                          <Col md={2}>
                            <img
                              src={item.photo}
                              style={{ width: "100%" }}
                              alt={item.name}
                            ></img>
                          </Col>
                          <Col md={5}>
                            <Link
                              to={`/${item.superCat}/${item.name}/${item.productId}`}
                              style={{ textDecoration: 'none', color: 'black' }}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={3} style={{ color: 'black' }}>
                            {item.qty} x ${item.price} x {item.shippingCost} = $
                            {item.qty * item.price + item.shippingCost}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                <h2 className="my-2 p-2 text-center" style={{background: '#ddd', color: 'white'}}>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Alert variant="danger">{error}</Alert>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="mybtn py-2 "
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PlaceOrder;
