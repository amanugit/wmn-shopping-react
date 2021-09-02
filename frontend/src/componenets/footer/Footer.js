import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer mt-2" id="footer">
      <Container className="footer-cont">
        <p>Made by Amanuel Ferede &copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}

export default Footer;
