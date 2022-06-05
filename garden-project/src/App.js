import "./App.css";
import "./App.scss";
import GardenPage from "./garden/GardenPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header.js";
import PlantsInfoPage from "./plants-info/PlantsInfoPage";
import ShoppingListPage from "./shopping-list/ShoppingListPage";
import DashboardPage from "./dashboard/DashboardPage.js";
import CreateAccountForm from "./create-account/CreateAccountForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/garden" element={<GardenPage />} />
        <Route path="/plants-info" element={<PlantsInfoPage />} />
        <Route path="shopping-list" element={<ShoppingListPage />} />
        <Route path="sign-up" element={<CreateAccountForm />} />
      </Routes>
    </Router>
  );
}

export default App;
