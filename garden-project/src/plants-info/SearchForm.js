import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import { fetchPlantInfo } from "./PlantsNetworking";

export default function SearchForm(props) {
  const [name, setName] = useState("");
  const [classification, setClassification] = useState(undefined);
  const [timeUntilHarvest, setTimeUntilHarvest] = useState(undefined);
  const [spacing, setSpacing] = useState(undefined);
  const [err, setErr] = useState(false);

  async function handleSearchFilter(e) {
    const result = await fetchPlantInfo(
      name,
      classification,
      timeUntilHarvest,
      spacing
    );
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
            placeholder="Search for a plant..."
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <input
              class="form-control"
              list="classificationOptions"
              id="classificationList"
              onChange={(e) => setClassification(e.target.value.split(" ")[0])}
              placeholder="Search by family..."
            />
            <datalist id="classificationOptions">
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
          <div>
            <input
              class="form-control"
              list="harvestPeriodOptions"
              id="harvestPeriodList"
              onChange={(e) => {
                let timeInWeeks = e.target.value.replace(/[^0-9]/g, "");
                if (e.target.value[0] === ">") timeInWeeks = "g" + timeInWeeks;
                setTimeUntilHarvest(timeInWeeks);
              }}
              placeholder="Search by how long a plant takes to grow..."
            />
            <datalist id="harvestPeriodOptions">
              <option value="< 4 Weeks" />
              <option value="< 6 Weeks" />
              <option value="< 8 Weeks" />
              <option value="< 12 Weeks" />
              <option value="< 16 Weeks" />
              <option value="< 24 Weeks" />
              <option value="> 24 Weeks" />
            </datalist>
          </div>
          <div>
            <input
              class="form-control"
              list="spacingOptions"
              id="spacingList"
              onChange={(e) => {
                let desiredSpacing = e.target.value.replace(/[^0-9]/g, "");
                if (e.target.value[0] === ">")
                  desiredSpacing = "g" + desiredSpacing;
                setSpacing(desiredSpacing);
              }}
              placeholder="Search by how close together plants can be sown..."
            />
            <datalist id="spacingOptions">
              <option value='< 12" apart' />
              <option value='< 24" apart' />
              <option value='< 36" apart' />
              <option value='> 36" apart' />
            </datalist>
          </div>
        </Col>
        <Col xs="auto">
          <Button type="button" size="lg" onClick={handleSearchFilter}>
            Search
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
