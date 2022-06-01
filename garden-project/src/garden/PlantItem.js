import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import PlantedCheckbox from "./PlantedCheckbox";
import HarvestedCheckbox from "./HarvestedCheckbox";

export default function PlantItem(props) {
  let { name, planted_at, harvested, estimated_harvest_date, quantity } =
    props.data;

  name = name.split(", ")[0];

  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>{name}</h5>
      </div>
      <div className="container-check-box">
        <PlantedCheckbox data={props.data} id="inline-checkbox-1" />
        <HarvestedCheckbox data={props.data} id="inline-checkbox-2" />
      </div>
      <div className="container-remove-button">
        <Button variant="outline-danger">remove</Button>
      </div>
    </ListGroup.Item>
  );
}
