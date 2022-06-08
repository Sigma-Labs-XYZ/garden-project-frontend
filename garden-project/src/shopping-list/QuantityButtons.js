import { ArrowUpSquare, ArrowDownSquare } from "react-bootstrap-icons";
import { patchQuantity } from "./ShoppingListNetworking";

export default function QuantityButtons(props) {
  async function handleQuantityChange(upOrDown) {
    let newQuantity = props.quantity;

    if (upOrDown === "up") {
      newQuantity++;
    } else {
      newQuantity--;
    }

    await patchQuantity(newQuantity, props.id);
    props.setChange(true);
  }
  return (
    <div className="arrows-wrapper">
      <div className="up-arrow">
        <ArrowUpSquare
          type="button"
          onClick={async () => handleQuantityChange("up")}
        />
      </div>
      {props.quantity}
      <div className="down-arrow">
        <ArrowDownSquare
          type="button"
          onClick={async () => handleQuantityChange("down")}
        />
      </div>
      quantity
    </div>
  );
}
