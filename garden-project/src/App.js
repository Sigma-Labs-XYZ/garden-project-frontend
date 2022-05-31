import "./App.css";
import "./App.scss";
import GardenPage from "./garden/GardenPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Header.js";

import PlantsInfoPage from "./plants-info/PlantsInfoPage";

function App() {
  return (
    <div>
      {<Header />}
    <Router>
      <Routes>
        <Route path="/garden" element={<GardenPage />} />
        <Route path="/plants-list" element={<PlantsInfoPage />} />
      </Routes>
    </Router>
</div>

  );
}

export default App;
