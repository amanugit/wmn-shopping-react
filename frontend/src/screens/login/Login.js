import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { Link } from "react-router-dom";

function Login({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/women";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const LoginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <section className="login" id="login">
      <Container>
        <Card
          style={{ maxWidth: "400px", margin: "auto" }}
          className="p-3 shadow-sm"
        >
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Spinner
                animation="border"
                size="lg"
                variant="warning"
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}
          <Card.Body>
            <Form onSubmit={LoginHandler}>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2 py-2"
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mb-4 py-2"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                ></Form.Control>
              </Form.Group>
              <div className="mb-4">
                <Button
                  type="submit"
                  className="mybtn py-2"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </div>
              <div>
                <Link
                  to={redirect ? `/register?${redirect}` : "/"}
                  className="ml-3"
                >
                  <Button
                    type="submit"
                    className="mybtn py-2 "
                    style={{ width: "100%" }}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Login;
