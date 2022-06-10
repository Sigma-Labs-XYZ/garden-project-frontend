import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import React from "react";
import { plantPlant } from "../plants-info/PlantsNetworking";

export default function PlantedCheckbox(props) {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState(new Date());
  const [disabled, setDisabled] = useState(props.disabled);
  let { name } = props.data;
  name = name.split(", ")[0];
  const id = props.data.id;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const plantedCheckbox = document.getElementById(`inline-planted-checkbox-${id}`);
    if (plantedCheckbox.checked) {
      setShow(true);
    }
  };
  const handlePlant = async (plantID, quantity, date) => {
    plantPlant(plantID, quantity, date);
    setDisabled(true);
    props.enableHarvest();
    props.reload();
    setShow(false);
  };

  return (
    <div>
      <Form>
        <Form.Check
          inline
          label="planted"
          name="group1"
          disabled={disabled}
          defaultChecked={props.checked}
          onClick={() => {
            handleShow();
          }}
          type={"checkbox"}
          id={`inline-planted-checkbox-${id}`}
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
                onChange={event => setDate(event.target.value)}
                placeholder="Enter a date format YYYY-MM-DD"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQuantity">
              <Form.Label>How many did you plant?</Form.Label>
              <Form.Control
                type="quantity"
                onChange={event => setQuantity(event.target.value)}
                placeholder="Quantity"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={e => {
              e.preventDefault();
              handlePlant(id, quantity, date);
            }}
          >
            Sow seeds!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
