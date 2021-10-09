import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home" id="home">
      <Container>
        <Row>
          <Col md={4} sm={12} className="cat-container mb-3">
            <Link to="/shop/men">
              <div className="img-container">
                <img
                  src="proImages/pro-1.jpg"
                  className="img-fluid"
                  alt="men"
                ></img>
                <div className="item">
                  <h3>Men</h3>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={4} sm={12} className="cat-container mb-3">
            <Link to="/shop/women">
              <div className="img-container">
                <img
                  src="proImages/pro-2.jpg"
                  className="img-fluid"
                  alt="men"
                ></img>
                <div className="item">
                  <h3>Women</h3>
                </div>
              </div>
            </Link>
          </Col>
          <Col md={4} sm={12} className="cat-container mb-3">
            <Link to="/shop/kid">
              <div className="img-container">
                <img
                  src="proImages/pro-3.jpg"
                  className="img-fluid"
                  alt="men"
                ></img>
                <div className="item">
                  <h3>Kids</h3>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
