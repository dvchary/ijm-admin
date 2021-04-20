import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMaster, getAllMasters } from "../actions/masterActons";
import Input from "../components/UI/Input";
import Modal from "../components/UI/Modal";

export default function Masters() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const master = useSelector((state) => state.masters); //state.projects is from Reducer

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMasters());
  }, [dispatch]);

  // console.log("projects list", project.projects);

  const renderMasters = (masters) => {
    // console.log("projects list", projects);
    let myMasters = [];
    for (let master of masters) {
      myMasters.push(
        <li key={master._id}>
          {master.name}
          {master.children.length > 0 ? (
            <ul>{renderMasters(master.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myMasters;
  };

  const getMasters = (masters, options = []) => {
    for (let master of masters) {
      options.push({ value: master._id, name: master.name });
      // if (master.children.length > 0) {
      //   getMasters(master.children, options);
      // }
    }
    return options;
  };

  const handleClose = () => {
    // const form = new FormData();

    // form.append("name", name); //"name" is asper the database
    // form.append("description", description); //"name" is asper the database
    // form.append("parentId", parentId); //"parentId" is asper the database

    // console.log("form data--->", form);

    const masterdata = {
      name,
      description,
      parentId,
    };

    dispatch(addMaster(masterdata));

    setName("");
    setParentId("");
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Masters Data</h3>
              <Button
                variant="primary"
                onClick={handleShow}
                style={{ backgroundColor: "darkblue" }}
              >
                Add New Master Data
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderMasters(master.masters)}
              {/* {JSON.stringify(getProjects(project.projects))} */}
            </ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Master Data"}
      >
        <Input
          value={name}
          placeholder={`Enter Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={description}
          placeholder={`Enter Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        >
          <option>Select Parent</option>
          {getMasters(master.masters).map((option) => (
            <option key={option._value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Button
          variant="primary"
          style={{ backgroundColor: "darkblue" }}
          className="btn-sm"
          onClick={handleClose}
        >
          Save Changes
        </Button>
      </Modal>
    </Layout>
  );
}
