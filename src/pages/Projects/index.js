import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getAllProject } from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

const Projects = (props) => {
  const [show, setShow] = useState(false);
  const [prjName, setPrjName] = useState("");
  const [prjParentId, setPrjParentId] = useState("");
  const [prjImage, setPrjImage] = useState("");
  const project = useSelector((state) => state.projects); //state.projects is from Reducer

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  // console.log("projects list", project.projects);

  const renderProjects = (projects) => {
    // console.log("projects list", projects);
    let myProjects = [];
    for (let project of projects) {
      myProjects.push(
        <li key={project._id}>
          {project.name}
          {project.children.length > 0 ? (
            <ul>{renderProjects(project.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myProjects;
  };

  const getProjects = (projects, options = []) => {
    for (let project of projects) {
      options.push({ value: project._id, name: project.name });
      if (project.children.length > 0) {
        getProjects(project.children, options);
      }
    }
    return options;
  };

  const handlePrjImage = (e) => {
    setPrjImage(e.target.files[0]);
  };

  const handleClose = () => {
    const form = new FormData();
    // const prj = {
    //   prjName,
    //   prjParentId,
    //   prjImage,
    // };

    form.append("name", prjName); //"name" is asper the database
    form.append("parentId", prjParentId); //"parentId" is asper the database
    form.append("image", prjImage); //"image" is asper the database

    dispatch(addProject(form));
    setPrjName("");
    setPrjParentId("");

    // console.log("Values from Modal Window", prj);

    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Projects</h3>
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
          <Col md={12}>
            <ul>
              {renderProjects(project.projects)}
              {/* {JSON.stringify(getProjects(project.projects))} */}
            </ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Project, Block, Wing"}
      >
        <Input
          value={prjName}
          placeholder={`Enter Name`}
          onChange={(e) => setPrjName(e.target.value)}
        />
        <select
          className="form-control"
          value={prjParentId}
          onChange={(e) => setPrjParentId(e.target.value)}
        >
          <option>Select Parent</option>
          {getProjects(project.projects).map((option) => (
            <option key={option._value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input type="file" name="prjImage" onChange={handlePrjImage} />
      </Modal>
    </Layout>
  );
};

export default Projects;
