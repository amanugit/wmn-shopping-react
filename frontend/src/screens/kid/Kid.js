import "./Kid.css";
import { Container, Row, Col, Button } from "react-bootstrap";
function Kid() {
  return (
    <section className="Kid" id="Kid">
      <div className="landing-container">
        <div className="landing-img-container">
          <h2 style={{ color: "black" }}>Kid's Latest Arrivals</h2>
        </div>
      </div>
      <Container className="my-4">
        <Row>
          <Col md={6} sm={12}>
            <h2>Woemn's fashion shopping page</h2>
            <img
              alt="kid-1"
              src="/img/kid/pexels-jessica-lewis-189857.jpg"
              className="img-fluid"
            ></img>
          </Col>
          <Col md={6} sm={12}>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ullamco laboris.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} className="py-3 my-4 bg-light">
            <h3 className="my-2">Top fashions of the week</h3>
            <Row>
              <Col md={3} sm={12}>
                <img
                  alt="kid-2"
                  src="/img/kid/pexels-jessica-lewis-189857.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  alt="kid-3"
                  src="/img/kid/pexels-monstera-7139956.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  alt="kid-4"
                  src="/img/kid/pexels-monstera-7140957.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  alt="kid-5"
                  src="/img/kid/pexels-nico-j-969373.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
            </Row>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <h3 className="my-2">Shop by categories</h3>
          <Col md={4} sm={12} className="shadow-sm">
            <img
              alt="kid-6"
              src="/img/kid/pexels-philip-boakye-2995309.jpg"
              className="img-fluid"
            ></img>
            <h1>Clothings</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
          <Col md={4} sm={12} className="shadow-sm">
            <img
              alt="kid-7"
              src="/img/kid/pexels-rodnae-productions-6182649.jpg"
              className="img-fluid"
            ></img>
            <h1>Bags</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
          <Col md={4} sm={12} className="shadow-sm">
            <img
              alt="kid-8"
              src="/img/kid/pexels-rodnae-productions-7104386.jpg"
              className="img-fluid"
            ></img>
            <h1>Shoes</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
          <Col md={4} sm={12} className="shadow-sm mt-4">
            <img
              alt="kid-9"
              src="/img/kid/pexels-rodnae-productions-8384323.jpg"
              className="img-fluid"
            ></img>
            <h1>Watches and Jweleries</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Kid;
