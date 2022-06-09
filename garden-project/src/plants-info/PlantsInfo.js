import { Accordion, Button, ListGroup, Stack, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./plants-info.css";
import { addPlantToGarden, addPlantToShoppingList } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import { PlusCircleFill, ListTask } from "react-bootstrap-icons/";

export default function PlantsInfo(props) {
  const [show, setShow] = useState(false);
  const [avoid, setAvoid] = useState([]);
  const [usersGardens, setUsersGardens] = useState([]);

  useEffect(() => {
    setUsersGardens(props.getUsersGardenState);
  }, []);

  const handleClose = () => {
    setShow(false);
    setAvoid([]);
  };
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

  function displayGardenButtons(data) {
    return data.map((gardens) => {
      return (
        <Button
          className="add-to-garden"
          onClick={() => handleAddToGarden(gardens.id)}
          variant="primary"
        >
          {" "}
          <Stack direction="horizontal" gap={2}>
            <PlusCircleFill /> <span> {"Add to " + gardens.garden_name}</span>
          </Stack>
        </Button>
      );
    });
  }

  async function handleAddToGarden(gardenID) {
    await addPlantToGarden(id, gardenID);
    setAvoid(
      props.checkAvoidInstructions(props.index)
        ? props.checkAvoidInstructions(props.index)
        : []
    );
  }

  async function handleAddToShoppingList() {
    const gardenID = 1;
    await addPlantToShoppingList(id, gardenID, 1);
  }

  useEffect(() => {
    if (avoid.length) {
      handleShow();
    }
  }, [avoid]);

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
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sowing instructions</div>
              {sow_instructions}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Spacing instructions</div>
              {space_instructions}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Harvest instructions</div>
              {harvest_instructions}
            </div>
          </ListGroup.Item>
          {compatible_plants && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Compatible plants</div>
                {compatible_plants}
              </div>
            </ListGroup.Item>
          )}
          {avoid_instructions && (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Avoid instructions</div>
                {avoid_instructions}
              </div>
            </ListGroup.Item>
          )}
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Culinary hints</div>
              {culinary_hints}
            </div>
          </ListGroup.Item>
        </ListGroup>

        <div id="buttons" className="d-flex justify-content-end">
          <Stack className="button-stack" direction="horizontal" gap={3}>
            {displayGardenButtons(usersGardens)}
            <Link to="/shopping-list">
              <Button
                variant="info"
                className="add-to-shopping-list"
                type="submit"
                onClick={handleAddToShoppingList}
              >
                <Stack direction="horizontal" gap={2}>
                  <ListTask /> <span>Add to shopping list</span>
                </Stack>
              </Button>
            </Link>
          </Stack>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <h6> Be careful, don't grow these near your: </h6>
            <p>{avoid}! </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Accordion.Body>
    </Accordion.Item>
  );
}
