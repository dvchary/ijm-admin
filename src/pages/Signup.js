import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import Input from "../components/UI/Input";
import { signup } from "../actions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <>
      <Layout>
        <Container>
          {user.message}
          <Row style={{ marginTop: "70px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="First Name"
                      placeholder="Enter your First Name "
                      value={firstName}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label="Last Name"
                      placeholder="Enter your Last Name "
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Input
                  label="Email"
                  placeholder="Enter your valid Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  placeholder="Enter your password "
                  value={password}
                  type="password"
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
    </>
  );
}
