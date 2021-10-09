import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
function Register({ location, history }) {
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();
  const { loading, userInfo, error } = userRegister;

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, passwordConfirm));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <section className="register" id="register">
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

          <Card.Body>
            <Form onSubmit={registerHandler}>
              <Form.Group>
                <Form.Label className="my-1">Name:</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2 py-2"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Your name"
                ></Form.Control>
                {error && error.name && (
                  <Alert variant="danger">{error.name}</Alert>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-1">Email:</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-2 py-2"
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter Email"
                ></Form.Control>
                {error && error.email && (
                  <Alert variant="danger">{error.email}</Alert>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-1">Password:</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mb-2 py-2"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter Password"
                ></Form.Control>
                {error && error.password && (
                  <Alert variant="danger">{error.password}</Alert>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-1">Confirm Password:</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                  className="mb-3 py-2"
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  placeholder="Confirm Password"
                ></Form.Control>
                {error && error.passwordConfirm && (
                  <Alert variant="danger">{error.passwordConfirm}</Alert>
                )}
              </Form.Group>
              <Button type="submit" className="mybtn py-2">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Register;
