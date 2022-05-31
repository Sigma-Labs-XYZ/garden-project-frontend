import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import PlantedCheckbox from "./PlantedCheckbox";
import HarvestedCheckbox from "./HarvestedCheckbox";

export default function PlantItem() {
  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>Plant name</h5>
      </div>
      <PlantedCheckbox id="inline-checkbox-1" />
      <HarvestedCheckbox id="inline-checkbox-2" />
      <div className="container-remove-button">
        <Button variant="outline-danger">remove</Button>
      </div>
    </ListGroup.Item>
  );
}
