import { Container, Button, Accordion } from "react-bootstrap";
import { fetchPlantInfo } from "./PlantsNetworking";
import { useState, useEffect } from "react";
import PlantsInfo from "./PlantsInfo";
import SearchForm from "./SearchForm";

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
    return plantInfo.map((plant, i) => {
      return <PlantsInfo key={i} activeKey={i} data={plant} />;
    });
  }
  return (
    <Container>
      <h1>HEADER</h1>
      <br></br>
      <SearchForm className="align-items-center" />
      <br></br>
      <Accordion defaultActiveKey="0" flush>
        {printPlantList()}
      </Accordion>
    </Container>
  );
}
