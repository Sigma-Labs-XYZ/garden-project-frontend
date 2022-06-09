import { Container, Accordion, Modal, Button } from "react-bootstrap";
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
import { getUserIDFromSession } from "../networking";

export default function PlantsInfoPage() {
  const navigate = useNavigate();
  const [plantInfo, setPlantInfo] = useState([]);
  const [gardenInfo, setGardenInfo] = useState([]);
  const [usersGardens, setUsersGardens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const userID = await getUserIDFromSession();
      await fetchAllGardensInfo(userID);
      await fetchInfo(userID);
    }
    fetchData();
  }, []);

  async function fetchAllGardensInfo(id) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens/${id}`
    );
    const data = await response.json();
    setUsersGardens(data);
  }

  useEffect(() => {
    checkCookiesAndRedirect(navigate);
  }, []);

  function getUsersGardenState() {
    // const gardenNames = [];
    // usersGardens.map((garden) => {
    //   return gardenNames.push(garden.garden_name);
    // });
    return usersGardens;
  }
  async function fetchInfo(id) {
    const plantData = await fetchPlantInfo();
    setPlantInfo(plantData);
    const gardenData = await fetchGardenInfo(id); // placeholder number
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
        if (
          listOfGardenPlants[i]
            .toLowerCase()
            .includes(avoidInstructions[j].toLowerCase())
        ) {
          samePlants.push(" " + listOfGardenPlants[i]);
          samePlants.push(" or");
        }
      }
    }

    let noDuplicatesInSamePlantList = [...new Set(samePlants)];
    return noDuplicatesInSamePlantList.shift();
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
          getUsersGardenState={getUsersGardenState}
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
