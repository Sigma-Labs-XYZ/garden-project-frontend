import { listOfTips } from "./listOfTips.js";
import "../dashboard.css";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
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
      <h1 className="tip-h1">
        <Stack direction="horizontal" gap={3}>
          <Lightbulb /> <span>Tips today...</span>
        </Stack>
      </h1>
      <Alert key="warning" variant="warning">
        <p className="tip-of-the-day">{chooseRandomTip()}</p>
      </Alert>

      <Alert key="warning" variant="warning">
        <p className="tip-of-the-day">{chooseRandomTipTwo()}</p>
      </Alert>
    </div>
  );
}
