import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import Input from "../components/UI/Input";
import { login, isUserLoggedIn } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

export default function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);

  const userLogin = (e) => {
    e.preventDefault();

    const user = { email, password };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "70px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your valid Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
