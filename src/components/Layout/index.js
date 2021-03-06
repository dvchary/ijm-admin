import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";

import "./style.css";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={`/`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/masters`}>Masters</NavLink>
                </li>
                <li>
                  <NavLink to={`/properties`}>Properties</NavLink>
                </li>
                <li>
                  <NavLink to={`/projects`}>Projects</NavLink>
                </li>
                <li>
                  <NavLink to={`/blocks`}>Blocks</NavLink>
                </li>
                <li>
                  <NavLink to={`/wings`}>Wings</NavLink>
                </li>
                <li>
                  <NavLink to={`/floors`}>Floors</NavLink>
                </li>
                <li>
                  <NavLink to={`/units`}>Inventory</NavLink>
                </li>
                <li>
                  <NavLink to={`/orders`}>Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "70px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
