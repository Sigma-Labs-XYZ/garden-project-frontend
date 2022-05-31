import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PlantedCheckbox from "./PlantedCheckbox";

export default function PlantItem() {
  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>Plant name</h5>
      </div>

      <PlantedCheckbox id="inline-checkbox-1" />
      <div className="container-check-box">
        <Form>
          <div key={`inline-checkbox`} className="mb-3">
            <Form.Check inline label="harvested" name="group1" type={"checkbox"} id={`inline-checkbox-2`} />
            <Form.Text>
              <p>Quantity: *number*</p>
            </Form.Text>
          </div>
        </Form>
      </div>
      <div className="container-remove-button">
        <Button variant="outline-danger">remove</Button>
      </div>
    </ListGroup.Item>
  );
}
