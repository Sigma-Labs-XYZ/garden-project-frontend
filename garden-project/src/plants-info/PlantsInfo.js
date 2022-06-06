import { Accordion, Button, ListGroup, Stack, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./plants-info.css";
import { addPlantToGarden } from "./PlantsNetworking";
import { useState } from "react";

export default function PlantsInfo(props) {
  const [show, setShow] = useState(false);
  const [avoid, setAvoid] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    id,
    name,
    sow_instructions,
    space_instructions,
    harvest_instructions,
    compatible_plants,
    avoid_instructions,
    culinary_hints,
  } = props.data;

  async function handleAddToGarden() {
    const gardenID = 1; // TEST VALUE: to be derived from session data in future
    await addPlantToGarden(id, gardenID);
    setAvoid(props.checkAvoidInstructions(props.index));
    console.log(avoid);
    if (avoid.length) {
      handleShow();
    }
  }

  return (
    <Accordion.Item eventKey={props.activeKey}>
      <Accordion.Header>
        <h1>{props.gardenID} </h1>
        <div className="link-to-plants" id={id}>
          {" "}
          {name}{" "}
        </div>{" "}
      </Accordion.Header>{" "}
      {/* Make this into bold text*/}
      <Accordion.Body>
        <ListGroup as="ol">
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sowing instructions</div>
              {sow_instructions}
            </div>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Spacing instructions</div>
              {space_instructions}
            </div>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Harvest instructions</div>
              {harvest_instructions}
            </div>
          </ListGroup.Item>
          {compatible_plants && (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Compatible plants</div>
                {compatible_plants}
              </div>
            </ListGroup.Item>
          )}
          {avoid_instructions && (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Avoid instructions</div>
                {avoid_instructions}
              </div>
            </ListGroup.Item>
          )}
          <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Culinary hints</div>
              {culinary_hints}
            </div>
          </ListGroup.Item>
        </ListGroup>

        <div id="buttons" className="d-flex justify-content-end">
          <Stack direction="horizontal" gap={3}>
            <Button variant="info" type="submit" onClick={handleAddToGarden}>
              Add to Garden
            </Button>
            <Link to="/shopping-list">
              <Button type="submit">Add to shopping list</Button>
            </Link>
          </Stack>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            Be careful, don't grow these near your: {avoid}!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Accordion.Body>
    </Accordion.Item>
  );
}
