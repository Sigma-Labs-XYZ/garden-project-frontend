import { listOfTips } from "./listOfTips.js";
import "../dashboard.css";

export default function Tips() {
  function chooseRandomTip() {
    const d = new Date();
    const n = d.getDate();
    const tipOfTheDay = listOfTips[n - 1];
    return tipOfTheDay;
  }

  return (
    <div className="tips-slide">
      <h1 id="tip-h1">tip of the day:</h1>
      <p className="tip-of-the-day">{chooseRandomTip()}</p>
    </div>
  );
}
