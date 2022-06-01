import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import React from "react";

export default function HarvestedCheckbox(props) {
  let { name } = props.data;
  name = name.split(", ")[0];
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const placeholderPlantID = 2;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const plantedCheckbox = document.getElementById("inline-checkbox-1");
    if (plantedCheckbox.checked) {
      setShow(true);
    }
  };
  const handleHarvest = async (plant_id, quantity) => {
    await fetch("http://garden-project.sigmalabs.co.uk/harvest", {
      method: "PUT",
      body: { plant_id, quantity },
    });
    setShow(false);
  };

  return (
    <div>
      <Form>
        <Form.Check
          inline
          label="harvested"
          name="group2"
          onClick={handleShow}
          type={"checkbox"}
          id={`inline-checkbox-2`}
        />
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Harvest your {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>How many {name} are you harvesting?</Form.Label>
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
              handleHarvest(placeholderPlantID, quantity);
            }}
          >
            Harvest!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
