import React, { useEffect } from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { listMyOrders } from "../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
function MyOrders({ history, match }) {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, orders, error } = orderListMy;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push(`/login/redirect=/user/${match.params.userId}/orders`);
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo, match, history]);
  return (
    <div className="myorders" id="myorders">
      <Container>
        <Row>
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
            <div>{error}</div>
          ) : orders.length > 0 ? (
            orders.map((order) => {
              return (
                <Col md={12} sm={12} className="shadow p-3 mb-3 mt-1">
                  <ListGroup>
                    <h4 className="my-3">Shipping Address</h4>
                    <ListGroup.Item>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}</p>
                      <p>{order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <h4 className="my-3">Order Items</h4>
                    {order.orderItems.length === 0 ? (
                      <h4>No Order Items</h4>
                    ) : (
                      order.orderItems.map((orderItem) => {
                        return (
                          <ListGroup.Item>
                            <p>
                              <span className="font-weight-bold">
                                Product Name
                              </span>
                              : {orderItem.name}
                            </p>
                            <p>
                              <img
                                src={orderItem.photo}
                                style={{ width: "200px", height: "200px" }}
                                alt={orderItem.name}
                              ></img>
                            </p>
                            <p>
                              <span className="font-weight-bold">Quantity</span>
                              : {orderItem.qty}
                            </p>

                            <p>
                              <span className="font-weight-bold">
                                Item Price
                              </span>{" "}
                              {orderItem.price}
                            </p>
                          </ListGroup.Item>
                        );
                      })
                    )}
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>
                      <p>
                        <span className="font-weight-bold">Tax Price: </span>
                        {order.taxPrice}
                      </p>
                      <p>
                        <span className="font-weight-bold">Total Price: </span>
                        {order.totalPrice}
                      </p>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>
                      {order.isDelivered ? (
                        <h6>Delivered at {order.deliveredAt}</h6>
                      ) : (
                        <h6>Not Delivered</h6>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {order.isPaid ? (
                        <h6>Paid at {order.paidAt}</h6>
                      ) : (
                        <h6>Not Paid</h6>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              );
            })
          ) : (
            <Alert variant="danger">No Orders</Alert>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default MyOrders;
