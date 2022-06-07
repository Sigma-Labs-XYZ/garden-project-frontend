import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";
import PlantedCheckbox from "./PlantedCheckbox";
import HarvestedCheckbox from "./HarvestedCheckbox";
import { deletePlant } from "./GardenNetworking";
import { HashLink } from "react-router-hash-link";

export default function PlantItem(props) {
  const [show, setShow] = useState(false);
  const [harvestDisabled, setHarvestDisabled] = useState(props.data.planted_at == null || props.data.harvested);
  const enableHarvest = () => setHarvestDisabled(false);
  const disableHarvest = () => setHarvestDisabled(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { name, id, plant_info_id } = props.data;

  name = name.split(", ")[0];

  async function handleDelete() {
    await deletePlant(id);
    setShow(false);
    window.location.reload(false);
  }

  return (
    <ListGroup.Item>
      <div className="container-title">
        <HashLink to={`/plants-info#${plant_info_id}`}>
          <h5> {name}</h5>
        </HashLink>
      </div>
      <div className="container-check-box">
        <PlantedCheckbox
          data={props.data}
          id={`inline-planted-checkbox-${props.data.id}`}
          disabled={props.data.planted_at != null}
          checked={props.data.planted_at != null}
          enableHarvest={enableHarvest}
        />
        <HarvestedCheckbox
          data={props.data}
          disabled={harvestDisabled}
          checked={props.data.harvested}
          disableHarvest={disableHarvest}
          id={`inline-harvested-checkbox-${props.data.id}`}
        />
      </div>
      <div className="container-remove-button">
        <Button variant="outline-danger" onClick={handleShow}>
          {" "}
          remove
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <p> Are you sure you want to delete this plant?</p>
            <Stack direction="horizontal" gap={3}>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="primary" onClick={handleClose}>
                No I'll keep it
              </Button>
            </Stack>
          </Modal.Body>
        </Modal>
      </div>
    </ListGroup.Item>
  );
}
