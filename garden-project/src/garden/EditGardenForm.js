import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import React from "react";
import { updateGarden } from "./GardenNetworking";

export default function EditGardenForm(props) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setOpen(false);
    setShow(true);
  };

  async function handleUpdateGarden() {
    if (name === "" || location === "") {
      updateError("Name or location can't be empty");
    } else if (name === "" && location === "") {
      updateError("Location and name can't be empty");
    } else {
      await updateGarden(name, location, props.gardenID);
      props.reload(props.gardenID, name, location);
      setShow(false);
    }
  }

  async function updateError(error) {
    setError(error);
  }
  console.log(props.gardenID);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Edit your garden
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your garden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Garden name:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setName(e.target.value);
                  updateError("");
                }}
                type="name"
                placeholder={props.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder={props.location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  updateError("");
                }}
              />
              <Form.Text className="text-muted">Enter your city</Form.Text>
              {error ? (
                <Alert key="danger" variant="danger">
                  {" "}
                  {error}{" "}
                </Alert>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateGarden}>
            Update garden
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
