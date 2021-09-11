import "./Men.css";
import { Container, Row, Col, Button } from "react-bootstrap";
function Men({ location, history }) {
  return (
    <section className="Men" id="Men">
      <div className="landing-container">
        <div className="landing-img-container">
          <h2 style={{ color: "white" }}>Men's Latest Arrivals</h2>
        </div>
      </div>
      <Container className="my-4">
        <Row>
          <Col md={6} sm={12}>
            <h2>Men's fashion shopping page</h2>
            <img
              alt="men-1"
              src="/img/men/pexels-andrea-piacquadio-842811.jpg"
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
                  alt="men-2"
                  src="/img/men/pexels-chloe-1043474.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  src="/img/men/pexels-pixabay-157675.jpg"
                  alt="men-3"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  alt="men-4"
                  src="/img/men/pexels-hamann-la-1192609.jpg"
                  className="img-fluid"
                ></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img
                  alt="men-5"
                  src="/img/men/pexels-hamann-la-1205033.jpg"
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
              alt="men-6"
              src="/img/men/pexels-hassan-ouajbir-1306248.jpg"
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
              alt="men-7"
              src="/img/men/pexels-mostafa-sannad-878358.jpg"
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
              src="/img/men/pexels-the-lazy-artist-gallery-1321943.jpg"
              alt="men-8"
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
              alt="men-9"
              src="/img/men/pexels-pixabay-157675.jpg"
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

export default Men;
