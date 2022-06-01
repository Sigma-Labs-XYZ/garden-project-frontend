import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import React from "react";

export default function PlantedCheckbox(props) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date());
  let { name } = props.data;
  name = name.split(", ")[0];
  const placeholderPlantID = 2;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const plantedCheckbox = document.getElementById("inline-checkbox-1");
    if (plantedCheckbox.checked) {
      setShow(true);
    }
  };
  const handlePlant = async (plant_id, quantity, date) => {
    await fetch("http://garden-project.sigmalabs.co.uk/plant-plant-in-garden", {
      method: "POST",
      body: { plant_id, quantity, date },
    });
    setShow(false);
  };

  return (
    <div>
      <Form>
        <Form.Check
          inline
          label="planted"
          name="group1"
          onClick={handleShow}
          type={"checkbox"}
          id={`inline-checkbox-1`}
        />
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Plant your {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formDatePlanted">
              <Form.Label>When did you plant your {name}?</Form.Label>
              <Form.Control
                type="datePlanted"
                onChange={(event) => setDate(event.target.value)}
                placeholder="TODO: make this a multiple select"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>How many did you plant?</Form.Label>
              <Form.Control
                type="quantity"
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="*current quantity*"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              handlePlant(placeholderPlantID, quantity, date);
            }}
          >
            Sow seeds!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
