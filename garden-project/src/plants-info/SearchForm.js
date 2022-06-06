import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import { fetchPlantInfo } from "./PlantsNetworking";

export default function SearchForm(props) {
  const [filter, setFilter] = useState("");
  const [err, setErr] = useState(false);

  async function handleSearchFilter(e) {
    const result = await fetchPlantInfo(filter);
    if (result.length > 0) {
      console.log(result);
      setErr(false);
      await props.getFilterPlants(result);
    } else {
      setErr("No Plant Found!");
    }
  }

  return (
    <Form>
      <Row className="d-flex justify-content-center">
        {" "}
        <Col xs={6}>
          <Form.Control
            id="inlineFormInput"
            size="lg"
            placeholder="Search for a plant ..."
            onChange={e => setFilter(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="button" size="lg" onClick={handleSearchFilter}>
            Filter
          </Button>
        </Col>
        {err ? (
          <Alert key="danger" variant="danger">
            {" "}
            {err}{" "}
          </Alert>
        ) : null}
      </Row>
    </Form>
  );
}
