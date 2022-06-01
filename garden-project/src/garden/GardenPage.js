import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import "./garden.css";
import PlantItem from "./PlantItem";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchGardenInfo } from "./GardenNetworking";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GardenPage() {
  const [gardenInfo, setGardenInfo] = useState([]);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
    setRemove(false);
  }, [remove]);

  async function fetchInfo() {
    const gardenData = await fetchGardenInfo(1); //placeholder number
    setGardenInfo(gardenData);
  }

  function printGardenPlants() {
    return gardenInfo.map((plant, i) => {
      return <PlantItem setRemove={setRemove} key={i} data={plant} />;
    });
  }
  return (
    <div className="garden-page-wrapper">
      <Stack direction="vertical" gap={3}>
        <div className="title-button-wrapper">
          <h1>Garden name</h1>

          <Stack direction="horizontal" gap={3} className="buttons">
            <Link to="/plants-info">
              <Button variant="info">Add plants to garden</Button>
            </Link>
            <Button variant="info">View shopping list</Button>
          </Stack>
        </div>

        <div className="plant-items-wrapper">
          <h3 shadow-sm> What's in your garden... </h3>
          <ListGroup variant="flush">{printGardenPlants()}</ListGroup>
        </div>
        <div className="calendar-button">
          <Button variant="info">View calendar</Button>
        </div>
      </Stack>
    </div>
  );
}
