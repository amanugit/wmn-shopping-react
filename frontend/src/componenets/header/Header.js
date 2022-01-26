import React, { useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { logOut } from "../../actions/userActions";
import { useDispatch } from "react-redux";
function Header() {
  const [show, setShow] = useState(false);
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const userLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };
  const showMobNav = () => {
    setShow(!show);
  };
  return (
    <header className="header" id="header">
      <Container>
        <nav className="header-nav">
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <h3 style={{ color: "black", fontSize: "2rem" }}>WMN</h3>
          </Link>
          <div className="side_nav" onClick={showMobNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul>
            <li>MEN</li>
            <li>
              <Link to="/women">WOMEN</Link>
            </li>
            <li>kIDS</li>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/cart" className="shopping_cart">
                <FaShoppingCart className="shoppingCart_Icon"></FaShoppingCart>{" "}
                <span>
                  <Badge className="cartIcon_Badge">
                    {cartItems.length > 0 ? cartItems.length : ""}
                  </Badge>
                </span>
              </Link>
            </li>
            {userInfo ? (
              <li className="drop_down">
                <a href={`#/profile/${userInfo.name}`}>{userInfo.name}</a>
                <ul className="profile_drop_down">
                  <li>
                    <Link
                      to={`/user/${userInfo.id}/orders`}
                      className="profile_nav_link"
                    >
                      My order history
                    </Link>
                  </li>
                  <li>
                    <a
                      href={`#/${userInfo.name}/setting`}
                      className="profile_nav_link"
                    >
                      Account and profile Settings
                    </a>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="profile_nav_link"
                      onClick={userLogOut}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <div
          className={
            show ? "side_nav_nav mobile-nav_toggle" : "mobile-nav_toggle_0"
          }
        >
          <ul>
            <li>MEN</li>
            <li>
              <Link className="side_nav_nav_link" to="/women">
                WOMEN
              </Link>
            </li>
            <li>kIDS</li>
            <li>
              <Link className="side_nav_nav_link" to="/">
                HOME
              </Link>
            </li>
            <li>
              <Link className="side_nav_nav_link" to="/cart">
                Cart {cartItems.length > 0 ? cartItems.length : ""}
              </Link>
            </li>
          </ul>
          {userInfo ? (
            <ul>
              <li>{userInfo.name}</li>
              <li>
                <Link
                  to={`/user/${userInfo.id}/orders`}
                  className="side_nav_nav_link"
                >
                  Order History
                </Link>
              </li>

              <li>Profile</li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
