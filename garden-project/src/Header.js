import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [gardenNames, setGardenNames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await getUUID();
    }
    fetchData();
  }, []);

  async function getUUID() {
    const cookies = await document.cookie;

    const sessionID = cookies
      .split("; ")
      .find((row) => row.startsWith("session="))
      .split("=")[1];

    await fetchUserID(sessionID);
  }

  async function fetchUserID(sessionID) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionID: sessionID }),
      }
    );
    const data = await response.json();
    if (data.length) {
      await fetchGardensOfUser(data[0].user_id);
    }
  }

  function mappingGardenNameDropdown(gardens) {
    const gardenDropdown = gardens.map((garden, i) => {
      return (
        <NavDropdown.Item href={garden} key={i}>
          {garden}
        </NavDropdown.Item>
      );
    });
    return gardenDropdown;
  }

  async function fetchGardensOfUser(userID) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens/${userID}`
    );

    const data = await response.json();
    await fetchGardenData(data);
  }

  async function fetchGardenData(gardenData) {
    const listOfGardenNames = [];
    for (let garden of gardenData) {
      listOfGardenNames.push(garden.garden_name);
    }
    await setGardenNames(listOfGardenNames);
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

  function featureDependingOnNumOfGardens(gardens, i) {
    if (gardens.length === 1) {
      return (
        <Navbar.Brand href={gardens} key={i}>
          My Garden
        </Navbar.Brand>
      );
    } else if (gardens.length > 1) {
      return (
        <NavDropdown title="My Gardens" id="gardensDropdown">
          {mappingGardenNameDropdown(gardenNames)}
        </NavDropdown>
      );
    }
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
