import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import "./Payment.css";
function Payment({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <section className="payment" id="payment">
      <Container>
        <Card
          style={{ maxWidth: "400px", margin: "auto" }}
          className="p-3 shadow-sm"
        >
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>

                <Form.Check
                  className="mb-2 py-2"
                  type="radio"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  className="mb-2 py-2"
                  type="radio"
                  label="Stripe"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Form.Group>

              <Button type="submit" variant="primary" className="mybtn my-2 ">
                Continue
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Payment;
