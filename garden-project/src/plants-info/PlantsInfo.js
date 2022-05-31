import { Accordion, Button, ListGroup } from "react-bootstrap";
import "./plants-info.css";

export default function PlantsInfo(props) {
  const {
    name,
    sow_instructions,
    space_instructions,
    harvest_instructions,
    compatible_plants,
    avoid_instructions,
    culinary_hints,
  } = props.data;

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
        <div className="d-flex justify-content-end">
          <Button variant="info" type="submit">
            {" "}
            Add to Garden{" "}
          </Button>

          <Button type="submit">Add to shopping list</Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
