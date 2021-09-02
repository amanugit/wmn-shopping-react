import { Link } from "react-router-dom";
import "./Women.css";
import { Container, Row, Col, Button } from "react-bootstrap";
function Women({ location, history }) {
  return (
    <section className="Women" id="Women">
      <div className="landing-container">
        <Container fluid className="landing-img-container">
          <Row className="p-5">
            <Col md={5} sm={6} className="p-3">
              <h2>Women's Latest Arrivals</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <Link to="/women">
                <Button className="mybutton_banner">Go to shopping</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-4">
        <Row>
          <Col md={6} sm={12}>
            <h2>Woemn's fashion shopping page</h2>
            <img src="/img/44.jpg" alt="women-1" className="img-fluid"></img>
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
                <img src="/img/1.jpg" alt="women-2" className="img-fluid"></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img src="/img/2.jpg" alt="women-3" className="img-fluid"></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img src="/img/3.jpg" alt="women-4" className="img-fluid"></img>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </Col>
              <Col md={3} sm={12}>
                <img src="/img/4.jpg" alt="women-5" className="img-fluid"></img>
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
            <img src="/img/1.jpg" alt="women-6" className="img-fluid"></img>
            <h1>Clothings</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
          <Col md={4} sm={12} className="shadow-sm">
            <img src="/img/bag.jpg" alt="women-7" className="img-fluid"></img>
            <h1>Bags</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
          <Col md={4} sm={12} className="shadow-sm">
            <img src="/img/shoe.jpg" alt="women-8" className="img-fluid"></img>
            <h1>Shoes</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
          <Col md={4} sm={12} className="shadow-sm mt-4">
            <img
              src="/img/jweleries_.jpg"
              alt="women-9"
              className="img-fluid"
            ></img>
            <h1> Jweleries</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
          <Col md={4} sm={12} className="shadow-sm mt-4">
            <img
              src="/img/watch.jpg"
              alt="women-10"
              className="img-fluid"
            ></img>
            <h1>Watches</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
          <Col md={4} sm={12} className="shadow-sm mt-4">
            <img
              src="/img/sports.jpg"
              alt="women-11"
              className="img-fluid"
            ></img>
            <h1>Sports</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button className="mybutton my-3">Shop Now</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Women;
