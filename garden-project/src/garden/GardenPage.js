import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./garden.css";
import PlantItem from "./PlantItem";
import ListGroup from "react-bootstrap/ListGroup";

export default function GardenPage() {
  return (
    <div className="garden-page-wrapper">
      <Stack direction="vertical" gap={3}>
        <div className="title-button-wrapper">
          <h1>Garden name</h1>

          <Stack direction="horizontal" gap={3} className="buttons">
            <Button variant="info">Add plants to garden</Button>
            <Button variant="info">View shopping list</Button>
          </Stack>
        </div>

        <div className="plant-items-wrapper">
          <h3 shadow-sm> What's in your garden... </h3>
          <ListGroup variant="flush">
            <PlantItem />
          </ListGroup>
        </div>
        <div className="calendar-button">
          <Button variant="info">View calendar</Button>
        </div>
      </Stack>
    </div>
  );
}
