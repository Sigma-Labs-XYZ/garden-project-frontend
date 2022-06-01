import { Accordion, Button, ListGroup, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./plants-info.css";
import { addPlantToGarden } from "./PlantsNetworking";

export default function PlantsInfo(props) {
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
  }

  return (
    <Accordion.Item eventKey={props.activeKey}>
      <Accordion.Header>{name}</Accordion.Header>{" "}
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
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Compatible plants</div>
              {compatible_plants}
            </div>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Avoid instructions</div>
              {avoid_instructions}
            </div>
          </ListGroup.Item>
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
          <Stack direction="horizontal" gap={3}>
            <Button variant="info" type="submit">
              {" "}
              Add to Garden{" "}
            </Button>
            <Link to="/shopping-list">
              <Button type="submit">Add to shopping list</Button>
            </Link>
          </Stack>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
