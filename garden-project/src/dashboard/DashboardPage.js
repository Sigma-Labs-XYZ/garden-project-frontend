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
      await fetchGardenInfo(1); // hardcoded at the moment
    }
    fetchData();
  }, []);

  async function fetchGardenInfo(id) {
    const response = await fetch(
      `http://garden-project.sigmalabs.co.uk/gardens/${id}`
    ); //need to change once backend is pushed to heroku
    const data = await response.json();
    checkIfGardenExists(data);
  }

  function checkIfGardenExists(data) {
    if (data.length) {
      setGardenExists(true);
    } else setGardenExists(false);
    setLoading(false);
  }

  console.log(gardenExists);
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
