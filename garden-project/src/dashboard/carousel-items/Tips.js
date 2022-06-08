import { listOfTips } from "./listOfTips.js";
import "../dashboard.css";
import Alert from "react-bootstrap/Alert";

export default function Tips() {
  function chooseRandomTip() {
    const d = new Date();
    const n = d.getDate();
    const tipOfTheDay = listOfTips[n - 1];
    return tipOfTheDay;
  }

  return (
    <div className="tips-slide">
      <h1 id="tip-h1">Tip of the day:</h1>
      <Alert key="primary" variant="primary">
        <p className="tip-of-the-day">{chooseRandomTip()}</p>
      </Alert>
    </div>
  );
}
