import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import React from "react";

export default function PlantedCheckbox() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const plantedCheckbox = document.getElementById("inline-checkbox-1");
    if (plantedCheckbox.checked) {
      setOpen(false);
      setShow(true);
    }
  };

  const handleCloseAlert = () => setOpen(false);

  return (
    <div>
      <Form>
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="planted"
            name="group1"
            onClick={handleShow}
            type={"checkbox"}
            id={`inline-checkbox-1`}
          />
        </div>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your garden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Garden name:</Form.Label>
              <Form.Control type="name" placeholder="{current garden name}" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="location" placeholder="{current garden location}" />
              <Form.Text className="text-muted">Enter your postcode, zipcode or city</Form.Text>
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
          <Button variant="primary" onClick={handleClose}>
            Update garden
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
