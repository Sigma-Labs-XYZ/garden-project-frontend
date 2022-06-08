import { listOfTips } from "./listOfTips.js";
import "../dashboard.css";
import Alert from "react-bootstrap/Alert";
import { Lightbulb } from "react-bootstrap-icons";

export default function Tips() {
  function chooseRandomTip() {
    const d = new Date();
    const n = d.getDate();
    const tipOfTheDay = listOfTips[n - 1];
    return tipOfTheDay;
  }
  function chooseRandomTipTwo() {
    const d = new Date();
    const n = d.getDate();
    const tipOfTheDay = listOfTips[n];
    return tipOfTheDay;
  }
  return (
    <div className="tips-slide">
      <h1 id="tip-h1">
        <Lightbulb /> Tips today...
      </h1>
      <Alert key="info" variant="info">
        <p className="tip-of-the-day">{chooseRandomTip()}</p>
      </Alert>
      <Alert key="info" variant="info">
        <p className="tip-of-the-day">{chooseRandomTipTwo()}</p>
      </Alert>
    </div>
  );
}
