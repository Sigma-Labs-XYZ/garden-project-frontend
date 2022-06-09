import CarouselForDashboard from "./Carousel.js";
import "./dashboard.css";
import Header from "./../Header.js";
import { useState, useEffect } from "react";
import CreateGarden from "./CreateGarden.js";

export default function DashboardPage() {
  const [gardenExists, setGardenExists] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await getUUID(); // hardcoded at the moment
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
      await fetchGardenInfo(data[0].user_id);
    } else {
      setGardenExists(false);
      setLoading(false);
    }
  }

  async function fetchGardenInfo(id) {
    const response = await fetch(
      `https://garden-project.sigmalabs.co.uk/allGardens/${id}`
    );

    const data = await response.json();

    checkIfGardenExists(data);
  }

  function checkIfGardenExists(data) {
    if (data.length) {
      setGardenExists(true);
      setLoading(false);
    } else {
      setGardenExists(false);
      setLoading(false);
    }
  }

  return (
    <div className="dashboard-wrapper">
      <Header />

      {loading ? (
        <div className="loading-spinner-wrapper">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : gardenExists ? (
        <CarouselForDashboard id="carousel-for-dashboard" />
      ) : (
        <CreateGarden />
      )}
    </div>
  );
}
