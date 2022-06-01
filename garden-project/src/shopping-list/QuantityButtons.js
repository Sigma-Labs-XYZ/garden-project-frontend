import { ArrowUpSquare, ArrowDownSquare } from "react-bootstrap-icons";

export default function QuantityButtons() {
  return (
    <div className="arrows-wrapper">
      <div className="up-arrow">
        <ArrowUpSquare />
      </div>
      0
      <div className="down-arrow">
        <ArrowDownSquare />
      </div>
      quantity
    </div>
  );
}
