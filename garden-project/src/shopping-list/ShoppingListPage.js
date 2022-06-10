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
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      await getUUID();
    }
    getData();
    setChange(false);
  }, [change]);

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
    await fetchInfo(data[0].user_id);
  }

  async function fetchInfo(userID) {
    const shoppingData = await fetchShoppingList(userID);
    setShoppingList(shoppingData);
  }

  function printShoppingList() {
    return shoppingList.map((plant, i) => {
      return <ShoppingPlants key={i} data={plant} setChange={setChange} />;
    });
  }

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
