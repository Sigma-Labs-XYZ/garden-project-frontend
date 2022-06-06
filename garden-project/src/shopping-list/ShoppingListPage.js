import ShoppingPlants from "./ShoppingPlants";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "./shopping-list.css";
import Header from "../Header";

export default function ShoppingListPage() {
  //  function printShoppingListPlants() {
  //     return gardenInfo.map((plant, i) => {
  //       return <ShoppingPlants />;
  //     });
  // }
  return (
    <div className="header-container">
      {<Header />}
      <div className="shopping-list-page-wrapper">
        <Stack direction="vertical" gap={3}>
          <div className="title-button-wrapper">
            <h1 id="shopping-list-h1">Shopping List</h1>

            <Link to="/garden">
              <Button variant="info">Back to Garden</Button>
            </Link>
          </div>

          <div className="shopping-items-wrapper">
            <h3> What's in your shopping list... </h3>
            <ListGroup variant="flush">
              <ShoppingPlants />
            </ListGroup>
          </div>
        </Stack>
      </div>
    </div>
  );
}
