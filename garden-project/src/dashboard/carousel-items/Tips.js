import { listOfTips } from "./listOfTips.js";

export default function Tips() {
  function chooseRandomTip() {
    const d = new Date();
    const n = d.getDate();
    const tipOfTheDay = listOfTips[n - 1];
    return tipOfTheDay;
  }

  return (
    <div className="tips-slide">
      <h1>The tip of the day is:</h1>
      <h4 className="tip-of-the-day">{chooseRandomTip()}</h4>
    </div>
  );
}
