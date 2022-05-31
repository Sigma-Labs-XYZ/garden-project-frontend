import { Form, Button, Col, Row } from "react-bootstrap";

export default function SearchForm() {
  return (
    <Form>
      <h1>Plant List</h1>
      <Row className="d-flex justify-content-center">
        {" "}
        <Col xs={6}>
          <Form.Control
            id="inlineFormInput"
            size="lg"
            placeholder="Search for a plant ..."
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" size="lg">
            Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
