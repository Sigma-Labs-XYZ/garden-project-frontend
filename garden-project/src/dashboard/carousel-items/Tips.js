import { listOfTipsOne, listOfTipsTwo } from "./listOfTips.js";
import "../dashboard.css";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import { Lightbulb } from "react-bootstrap-icons";

export default function Tips() {
  function chooseRandomTipOne() {
    const d = new Date();
    const n = d.getDate();
    let tipOfTheDay;

    if (n > 13) {
      tipOfTheDay = listOfTipsOne[n - 14];
    } else if (n > 26) {
      tipOfTheDay = listOfTipsOne[n - 20];
    } else {
      tipOfTheDay = listOfTipsOne[n - 1];
    }
    return tipOfTheDay;
  }

  function chooseRandomTipTwo() {
    const d = new Date();
    const n = d.getDate();
    let tipOfTheDay;

    if (n > 13) {
      tipOfTheDay = listOfTipsTwo[n - 14];
    } else if (n > 26) {
      tipOfTheDay = listOfTipsTwo[n - 20];
    } else {
      tipOfTheDay = listOfTipsTwo[n - 1];
    }
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
        <p className="tip-of-the-day">{chooseRandomTipOne()}</p>
      </Alert>

      <Alert key="warning" variant="warning">
        <p className="tip-of-the-day">{chooseRandomTipTwo()}</p>
      </Alert>
    </div>
  );
}
