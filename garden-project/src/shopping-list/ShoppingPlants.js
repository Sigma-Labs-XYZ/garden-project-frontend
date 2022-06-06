import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import BoughtCheckBox from "./BoughtCheckBox";
import QuantityButtons from "./QuantityButtons";

export default function ShoppingPlants() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleDelete() {}

  return (
    <ListGroup.Item>
      <div className="container-title">
        <h5>Plant</h5>
      </div>
      <div className="quantity-buttons">
        <QuantityButtons />
      </div>
      <div className="container-check-box">
        <BoughtCheckBox />
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
