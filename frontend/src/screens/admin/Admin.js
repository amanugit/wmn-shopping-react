import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  ListGroup,
  Alert,
  Pagination,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminListProducts } from "../../actions/productActions";
import { listOrders, deliverOrder } from "../../actions/orderActions";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaWindowClose,
  FaCheck,
} from "react-icons/fa";
import "./Admin.css";
function Admin({ match, history }) {
  const [searchTerm, setsearchTerm] = useState("");
  const productList = useSelector((state) => state.productAdminList);
  const productDelete = useSelector((state) => state.productDelete);
  const userLogin = useSelector((state) => state.userLogin);
  const orderList = useSelector((state) => state.orderList);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: orderDeliverSuccess } = orderDeliver;
  const { userInfo } = userLogin;
  const { success } = productDelete;

  const {
    loading: orderListLoading,
    error: orderListError,
    orders,
  } = orderList;

  const dispatch = useDispatch();
  const { loading, adminProducts, pages, error } = productList;
  const matchKey = match.params.key;
  const page = match.params.currentPageNo;
  const deletePrd = (id) => {
    alert("Opps, this feature is not applied! this is for demo purpose");
  };
  const searchProduct = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }
    history.push(`/admin/filter/products/${searchTerm}/${1}/`);
  };
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (matchKey === "products") {
        dispatch(adminListProducts(searchTerm, page));
      } else if (matchKey === "orders") {
        dispatch(listOrders());
      }
    } else {
      history.push("/admin/login?redirect=admin");
    }
  }, [dispatch, matchKey, userInfo, success, history, page]);

  return (
    <section className="admin" id="admin">
      <Container fluid>
        <div className="admin_side_nav">
          <ul>
            <li>
              <Link to="/admin/products" className="admin_side_nav_link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="admin_side_nav_link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="admin_side_nav_link">
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div className="admin_main">
          {matchKey === "products" ? (
            <div className="products_container">
              <Link to="/admin/products/add">
                <FaPlus
                  title="Add Products"
                  style={{ margin: "20px", fontSize: "2rem" }}
                ></FaPlus>
              </Link>
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
                  {error}
                </Alert>
              ) : (
                <div className="py-3">
                  <Form onSubmit={searchProduct}>
                    <Row>
                      <Col md={6} sm={12}>
                        <Form.Control
                          type="text"
                          placeholder="Search Product"
                          value={searchTerm}
                          onChange={(e) => setsearchTerm(e.target.value)}
                        ></Form.Control>
                      </Col>
                      <Col md={3} sm={12}>
                        <Button type="submit" className="mybtn">
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Photo</th>
                        <th>Price</th>
                        <th>Cateogry</th>
                        <th>Sub Category</th>
                        <th>Brand</th>
                        <th>Materials Made</th>
                        <th>Shipping Cost</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminProducts.map((pr) => {
                        return (
                          <tr key={pr._id}>
                            <td>{pr.name}</td>
                            <td>
                              <img
                                src={pr.photo}
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "100%",
                                  objectFit: "cover",
                                }}
                                alt={pr.name}
                              ></img>
                            </td>
                            <td>{pr.price}</td>
                            <td>{pr.superCat}</td>
                            <td>{pr.subCat}</td>
                            <td>{pr.brand}</td>
                            <td>{pr.material}</td>
                            <td>{pr.shippingCost}</td>
                            <td>
                              <Link to={`/admin/product/${pr._id}/edit`}>
                                <FaEdit
                                  title="view this product"
                                  style={{ color: "green" }}
                                ></FaEdit>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/admin/product/${pr._id}`}
                                title="view product"
                              >
                                <FaEye style={{ color: "#c06d00" }}></FaEye>
                              </Link>
                            </td>
                            <td>
                              <FaTrash
                                title="delete product"
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => {
                                  deletePrd(pr._id);
                                }}
                              ></FaTrash>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Pagination>
                    {[...Array(pages).keys()].map((x) => {
                      return (
                        <LinkContainer
                          key={x + 1}
                          to={
                            searchTerm
                              ? `/admin/filter/products/${searchTerm}/${x + 1}`
                              : `/admin/filter/products/${x + 1}`
                          }
                        >
                          <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                          </Pagination.Item>
                        </LinkContainer>
                      );
                    })}
                  </Pagination>
                </div>
              )}
            </div>
          ) : matchKey === "users" ? (
            <h4>usres</h4>
          ) : matchKey === "orders" ? (
            orderListLoading ? (
              <div className="spinner">
                <Spinner
                  animation="border"
                  size="lg"
                  variant="light"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            ) : orderListError ? (
              <div>
                <Alert variant="danger" className="text-center">
                  Opps: something went wrong..., try to reload the page
                </Alert>
              </div>
            ) : (
              <div>
                <Table bordered>
                  <thead>
                    <tr style={{ background: "#f2f2f2" }}>
                      <th>User</th>
                      <th>Order Items</th>
                      <th>Tax Price</th>
                      <th>Total Price</th>
                      <th>Address</th>
                      <th>Ordered At</th>
                      <th>Delivered</th>
                      <th>Paid</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <tr key={order._id}>
                          <td>{order.user && order.user.name}</td>
                          <td>
                            <ListGroup>
                              {order.orderItems.map((oi) => {
                                return (
                                  <ListGroup.Item key={oi._id}>
                                    <p>
                                      <strong>Name: </strong>
                                      <span>{oi.name}</span>
                                    </p>
                                    <p>
                                      <strong>Photo: </strong>
                                      <img
                                        src={oi.photo}
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          borderRadius: "100%",
                                          objectFit: "cover",
                                        }}
                                        alt={oi.name}
                                      ></img>
                                    </p>
                                    <p>
                                      <strong>Price: </strong>
                                      <span>{oi.price}</span>
                                    </p>
                                    <p>
                                      <strong>Quanity: </strong>
                                      <span>{oi.qty}</span>
                                    </p>
                                  </ListGroup.Item>
                                );
                              })}
                            </ListGroup>
                          </td>
                          <td>{order.taxPrice}</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            <ListGroup>
                              <ListGroup.Item>
                                <p>
                                  <strong>Address: </strong>
                                  {order.shippingAddress.address}
                                </p>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <p>
                                  <strong>City: </strong>
                                  {order.shippingAddress.city}
                                </p>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <p>
                                  <strong>Postal Code: </strong>
                                  {order.shippingAddress.postalCode}
                                </p>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <p>
                                  <strong>Country: </strong>
                                  {order.shippingAddress.country}
                                </p>
                              </ListGroup.Item>
                            </ListGroup>
                          </td>
                          <td>{order.createdAt}</td>
                          <td>
                            {!order.isDelivered ? (
                              <FaEdit
                                onClick={() => {
                                  dispatch(deliverOrder(order));
                                }}
                                title="Make it delivered"
                                style={{
                                  fontSize: "2rem",
                                  color: "#c06d00",
                                  cursor: "pointer",
                                }}
                              ></FaEdit>
                            ) : (
                              <FaCheck
                                style={{
                                  color: "white",
                                  background: "green",
                                  fontSize: "2rem",
                                }}
                                title="Delivered"
                              ></FaCheck>
                            )}
                          </td>
                          <td>
                            {!order.isPaid ? (
                              <FaWindowClose
                                style={{
                                  color: "white",
                                  background: "red",
                                  fontSize: "2rem",
                                }}
                                title="Not Paid"
                              ></FaWindowClose>
                            ) : (
                              <FaCheck
                                style={{
                                  color: "white",
                                  background: "green",
                                  fontSize: "2rem",
                                }}
                                title="Paid"
                              ></FaCheck>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )
          ) : (
            <h4 className="text-center py-3 my-3">
              Welcome to admin dashboard
            </h4>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Admin;
