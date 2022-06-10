import { Container, Accordion, Modal, Button } from "react-bootstrap";
import { fetchPlantInfo } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import PlantsInfo from "./PlantsInfo";
import SearchForm from "./SearchForm";
import { checkCookiesAndRedirect } from "../networking";
import { useNavigate } from "react-router-dom";
import "./plants-info.css";
import Header from "../Header";

import { getUserIDFromSession } from "../networking";

export default function PlantsInfoPage() {
  const navigate = useNavigate();
  const [plantInfo, setPlantInfo] = useState([]);

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
    return usersGardens;
  }
  async function fetchInfo() {
    const plantData = await fetchPlantInfo();
    setPlantInfo(plantData);
  }

  function printPlantList() {
    return plantInfo.map((plant, i) => {
      return (
        <PlantsInfo
          key={i}
          index={i}
          activeKey={i}
          data={plant}
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
