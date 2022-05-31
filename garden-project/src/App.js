import logo from "./logo.svg";
import "./App.css";
import "./App.scss";
import GardenPage from "./garden/GardenPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/garden" element={<GardenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
