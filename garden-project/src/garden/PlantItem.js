import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";

export default function PlantItem() {
  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>Plant name</h5>
      </div>

      <div className="container-check-box">
        <Form>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="planted"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
              />

              <Form.Check
                inline
                label="harvested"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
              />
              <Form.Text>
                <p>Quantity: *number*</p>
              </Form.Text>
            </div>
          ))}
        </Form>
      </div>
      <div className="container-remove-button">
        <Button variant="outline-danger">remove</Button>
      </div>
    </ListGroup.Item>
  );
}
