import { Container, Accordion } from "react-bootstrap";
import { fetchPlantInfo } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import PlantsInfo from "./PlantsInfo";
import SearchForm from "./SearchForm";
import { checkCookiesAndRedirect } from "../networking";
import { useNavigate } from "react-router-dom";
import "./plants-info.css";
import Header from "../Header";
import { fetchGardenInfo } from "../garden/GardenNetworking";
import { ListTask } from "react-bootstrap-icons/";

export default function PlantsInfoPage() {
  const navigate = useNavigate();
  const [plantInfo, setPlantInfo] = useState([]);
  const [gardenInfo, setGardenInfo] = useState([]);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
  }, []);

  useEffect(() => {
    checkCookiesAndRedirect(navigate);
  }, []);

  async function fetchInfo() {
    const plantData = await fetchPlantInfo();
    setPlantInfo(plantData);
    const gardenData = await fetchGardenInfo(1); // placeholder number
    setGardenInfo(gardenData);
  }

  function checkAvoidInstructions(index) {
    let listOfGardenPlants = [];
    let avoidInstructions = plantInfo[index].avoid_instructions.split(":")[1];
    let samePlants = [];
    avoidInstructions = avoidInstructions.split(", ");

    gardenInfo.forEach((plant) =>
      listOfGardenPlants.push(plant.name.split(", "))
    );

    listOfGardenPlants = listOfGardenPlants.flat();
    for (let i = 0; i < listOfGardenPlants.length; i++) {
      for (let j = 0; j < avoidInstructions.length; j++) {
        if (listOfGardenPlants[i].includes(avoidInstructions[j])) {
          samePlants.push(listOfGardenPlants[i]);
        }
      }
    }
    return samePlants.toString();
  }

  function printPlantList() {
    return plantInfo.map((plant, i) => {
      return (
        <PlantsInfo
          key={i}
          index={i}
          activeKey={i}
          data={plant}
          checkAvoidInstructions={checkAvoidInstructions}
        />
      );
    });
  }

  function getFilterPlants(filteredPlants) {
    setPlantInfo(filteredPlants);
  }
  return (
    <div className="header-container">
      {<Header />}

      <Container>
        <div className="plant-list-title-wrapper">
          <h1 id="plant-list-h1">Plant List</h1>
        </div>

        <SearchForm
          className="align-items-center"
          getFilterPlants={getFilterPlants}
        />
        <Accordion defaultActiveKey="0" flush>
          {printPlantList()}
        </Accordion>
      </Container>
    </div>
  );
}
