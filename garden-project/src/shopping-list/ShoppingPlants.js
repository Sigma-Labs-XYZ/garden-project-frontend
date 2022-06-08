import { ListGroup, Button, Modal, Stack, Image } from "react-bootstrap";
import { useState } from "react";
import BoughtCheckBox from "./BoughtCheckBox";
import QuantityButtons from "./QuantityButtons";
import { fetchPlantName, deleteItem } from "./ShoppingListNetworking";
import image from "./shopping-list-images/icons8-buying-26.png";

export default function ShoppingPlants(props) {
  const [show, setShow] = useState(false);
  const [plantName, setPlantName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  getName();

  async function handleDelete() {
    await deleteItem(props.data.id);
    setShow(false);
    props.setChange(true);
    window.location.reload(false);
  }

  async function getName() {
    const name = await fetchPlantName(props.data.plant_info_id);
    setPlantName(name[0]["name"]);
  }

  return (
    <ListGroup.Item>
      <div className="container-title">
        <Stack direction="horizontal" gap={3}>
          <Image src={image} />
          <h5>{plantName}</h5>
        </Stack>
      </div>
      <div className="quantity-buttons">
        <QuantityButtons
          quantity={props.data.quantity}
          id={props.data.id}
          setChange={props.setChange}
        />
      </div>
      <div className="container-check-box">
        <BoughtCheckBox
          setChange={props.setChange}
          id={props.data.id}
          bought={props.data.bought}
        />
      </div>

      <div className="container-remove-button">
        <Button variant="outline-danger" onClick={handleShow}>
          remove
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <p>
              Are you sure you want to remove this plant from your shopping
              list?
            </p>
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
