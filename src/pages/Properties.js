import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../actions/propertyActons";
import Layout from "../components/Layout";

export default function Properties() {
  const property = useSelector((state) => state.properties); //state.projects is from Reducer

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  const renderProperties = (properties) => {
    // console.log(properties);
    let myProperties = [];
    for (let property of properties) {
      myProperties.push(
        <li key={property._id}>
          {property.name}
          {property.children.length > 0 ? (
            <ul>{renderProperties(property.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myProperties;
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>All Properties</h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <ul style={{ display: "flex", justifyContent: "space-between" }}>
              {renderProperties(property.properties)}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
