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
        <div className="mb-3">
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
          <Modal.Title>Plant your *plant-name*</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDatePlanted">
              <Form.Label>When did you plant your *plant-name*</Form.Label>
              <Form.Control type="datePlanted" placeholder="TODO: make this a multiple select" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>How many did you plant?</Form.Label>
              <Form.Control type="quantity" placeholder="*current quantity*" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Plant seeds!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
