import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import "../dashboard/create-garden-form.css";
import { addGarden } from "./GardenNetworking";

export default function CreateNewGardenForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const [gardenName, setGardenName] = useState("");
  const [location, setLocation] = useState("");

  async function createNewGarden() {
    const cookies = document.cookie;
    const sessionID = cookies
      .split("; ")
      .find((row) => row.startsWith("session="))
      .split("=")[1];

    if (gardenName === "" || location === "") {
      updateError("Name or location can't be empty");
    } else {
      await addGarden(location, gardenName, sessionID);
      setShow(false);
    }
  }
  async function updateError(error) {
    setError(error);
  }
  return (
    <div className="create-garden-form-wrapper">
      <Button variant="primary" onClick={handleShow}>
        Create a new garden
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new garden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Garden name:</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter a name for your garden"
                onChange={(e) => {
                  setGardenName(e.target.value);
                  updateError("");
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder="Enter a location"
                onChange={(e) => {
                  setLocation(e.target.value);
                  updateError("");
                }}
              />
              <Form.Text className="text-muted">Enter your city name</Form.Text>
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
          <Button variant="primary" onClick={createNewGarden}>
            Create garden
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
