import ShoppingPlants from "./ShoppingPlants";
import { fetchShoppingList } from "./ShoppingListNetworking";
import { Stack, Button, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkCookiesAndRedirect } from "../networking";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

import "./shopping-list.css";
import Header from "../Header";

export default function ShoppingListPage() {
  const [shoppingList, setShoppingList] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    async function getData() {
      await fetchInfo();
    }
    getData();
    setChange(false);
  }, [change]);

  async function fetchInfo() {
    const shoppingData = await fetchShoppingList();
    setShoppingList(shoppingData);
  }
  function printShoppingList() {
    return shoppingList.map((plant, i) => {
      return <ShoppingPlants key={i} data={plant} setChange={setChange} />;
    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    checkCookiesAndRedirect(navigate);
  }, []);

  return (
    <div className="header-container">
      {<Header />}
      <div className="shopping-list-page-wrapper">
        <Stack direction="vertical" gap={3}>
          <div className="title-button-wrapper">
            <h1 id="shopping-list-h1">Shopping List</h1>

            <Link to="/garden">
              <Button variant="info">
                <Stack direction="horizontal" gap={2}>
                  <ArrowLeft /> Back to Garden
                </Stack>
              </Button>
            </Link>
          </div>

          <div className="shopping-items-wrapper">
            <h3 id="shopping-list-h3"> What's in your shopping list... </h3>
            <ListGroup variant="flush">{printShoppingList()}</ListGroup>
          </div>
        </Stack>
      </div>
    </div>
  );
}
