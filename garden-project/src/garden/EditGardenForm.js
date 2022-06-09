import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import React from "react";
import { updateGarden } from "./GardenNetworking";

export default function EditGardenForm() {
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
  const handleCloseAlert = () => setOpen(false);

  async function handleUpdateGarden() {
    if (name === "" || location === "") {
      updateError("Name or location can't be empty");
    } else if (name === "" && location === "") {
      updateError("Location and name can't be empty");
    } else {
      await updateGarden(name, location, 1);
      setShow(false);
    }
  }
  async function updateError(error) {
    setError(error);
  }
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
                onChange={e => {
                  setName(e.target.value);
                  updateError("");
                }}
                type="name"
                placeholder="{current garden name}"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder="{current garden location}"
                onChange={e => {
                  setLocation(e.target.value);
                  updateError("");
                }}
              />
              <Form.Text className="text-muted">Enter your postcode, zipcode or city</Form.Text>
              {error ? (
                <Alert key="danger" variant="danger">
                  {" "}
                  {error}{" "}
                </Alert>
              ) : null}
            </Form.Group>
            <Button
              variant="outline-danger"
              onClick={() => setOpen(!open)}
              aria-controls="collapse-text"
              aria-expanded={open}
            >
              Delete garden
            </Button>

            <Collapse in={open}>
              <div id="collapse-text">
                <Alert variant="danger" key="danger">
                  <p> Are you sure you want to delete this garden? </p>
                  <p> This action is irreversible</p>
                </Alert>
                <Button variant="outline-danger" onClick={handleClose}>
                  Yes delete my garden
                </Button>
                <Button variant="info" onClick={handleCloseAlert}>
                  No I'll keep my garden
                </Button>
              </div>
            </Collapse>
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
