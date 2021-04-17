import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";
import Layout from "../components/Layout";
import Input from "../components/UI/Input";
import Modal from "../components/UI/Modal";
import { addUnit } from "../actions";

export default function Units() {
  const [unitName, setUnitName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPictures, setUnitPictures] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [show, setShow] = useState(false);

  const project = useSelector((state) => state.projects); //state.projects is from Reducer

  const dispatch = useDispatch();

  const getProjects = (projects, options = []) => {
    for (let project of projects) {
      options.push({ value: project._id, name: project.name });
      if (project.children.length > 0) {
        getProjects(project.children, options);
      }
    }
    return options;
  };

  const handleUnitPictures = (e) => {
    setUnitPictures([...unitPictures, e.target.files[0]]);
  };

  // console.log("Unit Pictures----->", unitPictures);

  const renderUnitsTable = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Unit Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Floor</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const handleClose = () => {
    const form = new FormData();

    const unit = {
      unitName,
      description,
      projectId,
    };

    form.append("name", unitName);
    form.append("description", description);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("project", projectId);

    for (let pic of unitPictures) {
      form.append("unitPictures", pic);
    }

    console.log("Unit details from Model---->", unit);
    dispatch(addUnit(form));
    console.log("dispatched---->");
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Inventory</h3>
                <Button
                  variant="primary"
                  onClick={handleShow}
                  style={{ backgroundColor: "darkblue" }}
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>{renderUnitsTable()}</Col>
          </Row>
        </Container>
        <Modal
          show={show}
          handleClose={handleClose}
          modalTitle={"Add New Unit"}
        >
          <Input
            label="unitName"
            value={unitName}
            placeholder={`Enter Unit Name`}
            onChange={(e) => setUnitName(e.target.value)}
          />
          <Input
            label="Description"
            value={description}
            placeholder={`Enter Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Price"
            value={price}
            placeholder={`Enter Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Qunatity"
            value={quantity}
            placeholder={`Enter Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            className="form-control"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option>Unit Belongs To</option>
            {getProjects(project.projects).map((option) => (
              <option key={option._value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {unitPictures.length > 0
            ? unitPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <input
            type="file"
            name="unitPictures"
            onChange={handleUnitPictures}
          />
        </Modal>
      </Layout>
    </>
  );
}
