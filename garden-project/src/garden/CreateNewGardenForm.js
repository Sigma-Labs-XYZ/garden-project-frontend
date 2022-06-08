import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import React from "react";

export default function CreateNewGardenForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState("");
  const [gardenName, setGardenName] = useState("");
  const [location, setLocation] = useState("");

  async function createNewGarden() {
    if (gardenName === "" || location === "") {
      updateError("Name or location can't be empty");
    } else if (gardenName === "" && location === "") {
      updateError("Location and name can't be empty");
    } else {
      // fetch request
      setShow(false);
    }
  }
  async function updateError(error) {
    setError(error);
  }
  return (
    <div>
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
                placeholder="{current garden location}"
                onChange={(e) => {
                  setLocation(e.target.value);
                  updateError("");
                }}
              />
              <Form.Text className="text-muted">
                Enter your postcode, zipcode or city
              </Form.Text>
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
