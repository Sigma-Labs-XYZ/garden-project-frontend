import CreateNewGardenForm from "../garden/CreateNewGardenForm.js";
import "./create-garden-form.css";
import Stack from "react-bootstrap/Stack";

export default function CreateGarden() {
  return (
    <div className="create-garden-wrapper">
      <Stack className="create-garden-stack" direction="vertical" gap={3}>
        <h1>Create a garden to get started...</h1>
        <CreateNewGardenForm />
      </Stack>
    </div>
  );
}
