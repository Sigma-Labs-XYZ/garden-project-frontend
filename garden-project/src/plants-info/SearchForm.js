import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import { fetchPlantInfo } from "./PlantsNetworking";

export default function SearchForm(props) {
  const [name, setName] = useState("");
  const [classification, setClassification] = useState(undefined);
  const [err, setErr] = useState(false);

  async function handleSearchFilter(e) {
    const result = await fetchPlantInfo(name, classification);
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
            placeholder="Search for a plant by name..."
            onChange={e => setName(e.target.value)}
          />
          <div>
            <input
              class="form-control"
              list="datalistOptions"
              id="exampleDataList"
              onChange={e => setClassification(e.target.value.split(" ")[0])}
              placeholder="Search by family..."
            />
            <datalist id="datalistOptions">
              <option value="Cruciferae (Brassicas)" />
              <option value="Solanaceae (inc. Tubers)" />
              <option value="Legumes (Beans and Peas)" />
              <option value="Alliums (Onion Family)" />
              <option value="Umbelliferae (Celery, Carrot etc.)" />
              <option value="Cucurbitaceae (Gourds)" />
              <option value="Asteraceae (Sunflower, Lettuce etc.)" />
              <option value="Lamiaceae (Mint, Sage etc.)" />
            </datalist>
          </div>
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
