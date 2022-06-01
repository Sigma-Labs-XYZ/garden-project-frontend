import "./App.css";
import "./App.scss";
import GardenPage from "./garden/GardenPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header.js";
import PlantsInfoPage from "./plants-info/PlantsInfoPage";
import ShoppingListPage from "./shopping-list/ShoppingListPage";

function App() {
  return (
    <div>
      <div className="header-container">{<Header />}</div>

      <Router>
        <Routes>
          <Route path="/garden" element={<GardenPage />} />
          <Route path="/plants-info" element={<PlantsInfoPage />} />
          <Route path="shopping-list" element={<ShoppingListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
