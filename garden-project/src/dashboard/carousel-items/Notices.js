import { HourglassSplit } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import "../dashboard.css";
import { getUserIDFromSession } from "../../networking";

export default function Notices() {
  const [harvests, setHarvests] = useState([{}]);

  useEffect(() => {
    getImminentHarvests();
  }, []);

  async function getImminentHarvests() {
    const userID = await getUserIDFromSession();
    const harvests = await fetch(
      `https://garden-project.sigmalabs.co.uk/harvest-dates/${userID}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setHarvests(await harvests.json());
  }

  function generateHarvestReminderText(harvest) {
    const soonestHarvest = harvest;
    console.log(soonestHarvest.estimatedHarvestDate);
    const readableDate = new Date(soonestHarvest.estimatedHarvestDate)
      .toString()
      .split(" ")
      .slice(0, 4)
      .join(" ");
    return ` Your ${soonestHarvest.name}s in the garden "${soonestHarvest.garden}" will be ready to harvest on ${readableDate}`;
  }

  function generateHarvestReminders() {
    return harvests.slice(0, 3).map((harvest) => {
      return <h4 id="reminders-h4"> {generateHarvestReminderText(harvest)}</h4>;
    });
  }

  return (
    <div className="reminder-slide">
      <h1 className="reminders-h1">
        <Stack direction="horizontal" gap={3}>
          <HourglassSplit /> <span>Reminders...</span>
        </Stack>
      </h1>

      <br />
      <div class="reminders-wrapper">{generateHarvestReminders()}</div>
    </div>
  );
}
