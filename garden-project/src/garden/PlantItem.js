import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import PlantedCheckbox from "./PlantedCheckbox";
import HarvestedCheckbox from "./HarvestedCheckbox";
import { deletePlant } from "./GardenNetworking";

export default function PlantItem(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { name, id } = props.data;

  name = name.split(", ")[0];

  async function handleDelete() {
    await deletePlant(id);
    setShow(false);
    props.setRemove(true);
  }

  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>{name}</h5>
      </div>
      <div className="container-check-box">
        <PlantedCheckbox data={props.data} id={`inline-planted-checkbox-${props.data.id}`} />
        <HarvestedCheckbox data={props.data} id={`inline-harvested-checkbox-${props.data.id}`} />
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
