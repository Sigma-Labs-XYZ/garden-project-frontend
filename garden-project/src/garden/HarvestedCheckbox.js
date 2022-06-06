import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import React from "react";
import { harvestPlant } from "../plants-info/PlantsNetworking";

export default function HarvestedCheckbox(props) {
  let { name } = props.data;
  name = name.split(", ")[0];
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const id = props.data.id;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    const plantedCheckbox = document.getElementById(`inline-planted-checkbox-${id}`);
    const harvestedCheckbox = document.getElementById(`inline-harvested-checkbox-${id}`);

    if (plantedCheckbox.checked && harvestedCheckbox.checked) {
      setShow(true);
    }
  };
  const handleHarvest = async plantID => {
    harvestPlant(plantID);
    props.disableHarvest();
    handleClose();
  };

  return (
    <div>
      <Form>
        <Form.Check
          inline
          label="harvested"
          name="group2"
          disabled={props.disabled}
          onClick={handleShow}
          type={"checkbox"}
          id={`inline-harvested-checkbox-${id}`}
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
                onChange={event => setQuantity(event.target.value)}
                placeholder="*current quantity*"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={e => {
              e.preventDefault();
              handleHarvest(id);
            }}
          >
            Harvest!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
