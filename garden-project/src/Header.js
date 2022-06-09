import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIDFromSession } from "./networking";

export default function Header() {
  const [usersGardens, setUsersGardens] = useState([]);
  const [gardenNames, setGardenNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const userID = await getUserIDFromSession();
      await fetchGardenInfo(userID);
    }
    fetchData();
  }, []);

  async function fetchGardenInfo(id) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens/${id}`
    );
    const data = await response.json();
    setUsersGardens(data);
  }

  function mappingGardenNameDropdown(gardens) {
    const gardenDropdown = gardens.map((garden, i) => {
      return (
        <NavDropdown.Item
          onClick={() =>
            handleNavToGarden(garden.id, garden.garden_name, garden.location)
          }
          key={i}
        >
          {garden.garden_name}
        </NavDropdown.Item>
      );
    });
    return gardenDropdown;
  }

  function handleNavToGarden(gardenID, gardenName, gardenLocation) {
    navigate("/garden", { state: { gardenID, gardenName, gardenLocation } });
  }

  async function handleLogout() {
    const cookies = document.cookie;
    const sessionID = cookies
      .split("; ")
      .find((row) => row.startsWith("session="))
      .split("=")[1];

    await fetch("https://garden-project.sigmalabs.co.uk/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionID: sessionID,
      }),
    });
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  }

  function featureDependingOnNumOfGardens(gardens) {
    return (
      <NavDropdown
        title={"My Garden" + (gardens.length > 1 ? "s" : "")}
        id="gardensDropdown"
      >
        {mappingGardenNameDropdown(usersGardens)}
      </NavDropdown>
    );
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="dashboard">GRDN</Navbar.Brand>
        <Navbar.Brand href="plants-info">Plants</Navbar.Brand>
        {featureDependingOnNumOfGardens(gardenNames)}
        <NavDropdown title="Guides" id="navbarGuidesDropdown">
          <NavDropdown.Item href="crop-rotation">
            Crop Rotation
          </NavDropdown.Item>
          <NavDropdown.Item href="weeding">Weeding</NavDropdown.Item>
          <NavDropdown.Item href="planting-practices">
            Planting Practices
          </NavDropdown.Item>
          <NavDropdown.Item href="fertilisers">Fertilisers</NavDropdown.Item>
          <NavDropdown.Item href="composting">Composting</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand onClick={handleLogout}>Logout</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
