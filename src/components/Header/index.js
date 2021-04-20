import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../../actions/authActions";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink
            to="enquiryform"
            className="nav-link"
            style={{ color: "#fff" }}
          >
            Enquiry Form
          </NavLink>
        </li>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={logout}
            style={{ cursor: "pointer", fontWeight: "bold", color: "#fff" }}
          >
            Logout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="signin" className="nav-link" style={{ color: "#fff" }}>
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="signup" className="nav-link" style={{ color: "#fff" }}>
            Register New Users
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      // bg="primary"
      variant="dark"
      style={{ zIndex: 1, backgroundColor: "darkblue" }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          IJM Properties
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
