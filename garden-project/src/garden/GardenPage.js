import { Button, Stack, ListGroup } from "react-bootstrap";
import "./garden.css";
import PlantItem from "./PlantItem";
import { checkCookiesAndRedirect } from "../networking";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchGardenInfo } from "./GardenNetworking";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditGardenForm from "./EditGardenForm";
import Header from "../Header";
import { PinMap, PlusCircleFill, ListTask } from "react-bootstrap-icons/";

export default function GardenPage() {
  const navigate = useNavigate();
  const [gardenInfo, setGardenInfo] = useState([]);
  const [remove, setRemove] = useState(false);
  const { state } = useLocation();

  console.log(state);

  useEffect(() => {
    checkCookiesAndRedirect(navigate);
  }, []);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
    setRemove(false);
  }, [remove]);

  async function fetchInfo() {
    const gardenID = state.gardenID;
    console.log(gardenID);
    const gardenData = await fetchGardenInfo(gardenID);
    setGardenInfo(gardenData);
  }

  function printGardenPlants() {
    return gardenInfo.map((plant, i) => {
      return <PlantItem setRemove={setRemove} remove={remove} key={i} data={plant} />;
    });
  }
  return (
    <div>
      <div className="header-container">{<Header />}</div>
      <div className="garden-page-wrapper">
        <Stack direction="vertical" gap={3}>
          <div className="title-button-wrapper">
            <h2 id="garden-h2">
              {state.gardenName}
              <h4 id="garden-location-h4">{state.gardenLocation}</h4>
            </h2>

            <Stack direction="horizontal" gap={3} className="buttons">
              <Link to="/plants-info">
                <Button className="add-to-garden" variant="info">
                  <Stack direction="horizontal" gap={2}>
                    <PlusCircleFill /> <span>Add to plants to garden</span>
                  </Stack>
                </Button>
              </Link>
              <Link to="/shopping-list">
                <Button className="add-to-shopping-list" variant="info">
                  <Stack direction="horizontal" gap={2}>
                    <ListTask /> <span>View shopping list </span>
                  </Stack>
                </Button>
              </Link>
            </Stack>
          </div>

          <div className="plant-items-wrapper">
            <h3 id="garden-h3" shadow-sm>
              {" "}
              What's in your garden...{" "}
            </h3>
            <ListGroup variant="flush">{printGardenPlants()}</ListGroup>
          </div>
          <div className="calendar-button">
            <Button variant="info">View calendar</Button>
          </div>
          <div className="edit-garden-button">
            <EditGardenForm />
          </div>
        </Stack>
      </div>
    </div>
  );
}
