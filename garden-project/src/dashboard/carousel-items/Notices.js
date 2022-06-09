import { HourglassSplit } from "react-bootstrap-icons";
import Stack from "react-bootstrap/Stack";
import "../dashboard.css";

export default function Notices() {
  return (
    <div className="reminder-slide">
      <h1 className="reminders-h1">
        <Stack direction="horizontal" gap={3}>
          <HourglassSplit /> <span>Reminders...</span>
        </Stack>
      </h1>
      <h4>Don't forget to water your plants!</h4>
    </div>
  );
}
