import { Container, Accordion } from "react-bootstrap";
import { fetchPlantInfo, searchFilter } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import PlantsInfo from "./PlantsInfo";
import SearchForm from "./SearchForm";
import "./plants-info.css";

export default function PlantsInfoPage() {
  const [plantInfo, setPlantInfo] = useState([]);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
  }, []);

  async function fetchInfo() {
    const plantData = await fetchPlantInfo();
    setPlantInfo(plantData);
  }
  function printPlantList() {
    console.log(plantInfo);
    return plantInfo.map((plant, i) => {
      return <PlantsInfo key={i} activeKey={i} data={plant} />;
    });
  }

  function getFilterPlants(filteredPlants) {
    setPlantInfo(filteredPlants);
  }
  return (
    <div>
      <Container>
        <div className="plant-list-title-wrapper">
          <h1>Plant List</h1>
        </div>
        <SearchForm
          className="align-items-center"
          searchFilter={searchFilter}
          getFilterPlants={getFilterPlants}
        />
        <Accordion defaultActiveKey="0" flush>
          {printPlantList()}
        </Accordion>
      </Container>
    </div>
  );
}
