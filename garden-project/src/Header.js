import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";

const gardenNames = ["My Garden 1", "My Garden 2", "My Garden 3"];

export default function Header() {
  function mappingGardenNameDropdown(gardens) {
    const gardenDropdown = gardens.map((garden) => {
      return <NavDropdown.Item href={garden}>{garden}</NavDropdown.Item>;
    });
    return gardenDropdown;
  }

  function featureDependingOnNumOfGardens(gardens) {
    if (gardens.length === 1) {
      return <Navbar.Brand href={gardens}>My Garden</Navbar.Brand>;
    } else if (gardens.length > 1) {
      return (
        <NavDropdown title="My Gardens" id="gardensDropdown">
          {mappingGardenNameDropdown(gardenNames)}
        </NavDropdown>
      );
    }
  }

  return (
    <Navbar fixed="top">
      <Container>
        <Navbar.Brand href="#home">Logo/Name</Navbar.Brand>
        <Navbar.Brand href="#plants">Plants</Navbar.Brand>
        {featureDependingOnNumOfGardens(gardenNames)}
        <NavDropdown title="Guides" id="navbarGuidesDropdown">
          <NavDropdown.Item href="#cropRotation">
            Crop Rotation
          </NavDropdown.Item>
          <NavDropdown.Item href="#weeding">Weeding </NavDropdown.Item>
          <NavDropdown.Item href="#plantingPractices">
            Planting Practices
          </NavDropdown.Item>
          <NavDropdown.Item href="#fertilisers">Fertilisers</NavDropdown.Item>
          <NavDropdown.Item href="#composting">Composting</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand href="#logout">Logout</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
