import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import PlantedCheckbox from "./PlantedCheckbox";
import HarvestedCheckbox from "./HarvestedCheckbox";
import { deletePlant } from "./GardenNetworking";
import { HashLink } from "react-router-hash-link";
import { DashCircleFill, Flower3 } from "react-bootstrap-icons";
import plant from "./plant-images/icons8-sprout-30.png";

export default function PlantItem(props) {
  const [show, setShow] = useState(false);
  const [harvestDisabled, setHarvestDisabled] = useState(props.data.planted_at == null || props.data.harvested);
  const [reload, setReload] = useState(true);
  const enableHarvest = () => setHarvestDisabled(false);
  const disableHarvest = () => setHarvestDisabled(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { name, id, plant_info_id, planted_at } = props.data;

  function getPlantedAtDate() {
    if (planted_at) {
      const plantedAt = planted_at.toString().slice(0, 10);
      return "Planted at: " + plantedAt;
    }
  }

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
          <h5>
            <Stack direction="horizontal" gap={3}>
              <Image src={plant} />
              <span>{name}</span>
            </Stack>
          </h5>
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
      <div className="container-planted-at">{getPlantedAtDate()}</div>
      <div className="container-remove-button">
        <Button className="remove-from-list" variant="outline-danger" onClick={handleShow}>
          <Stack direction="horizontal" gap={2}>
            <DashCircleFill /> <span> Remove </span>
          </Stack>
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
