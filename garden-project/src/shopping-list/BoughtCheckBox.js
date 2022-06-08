import Form from "react-bootstrap/Form";

import { patchBought } from "./ShoppingListNetworking";

export default function BoughtCheckBox(props) {
  async function handleCheckBox(e) {
    await patchBought(e.target.checked, props.id);
    // window.location.reload(false);
  }
  return (
    <Form>
      <Form.Check
        inline
        label="Bought"
        name="group2"
        value="yes"
        type={"checkbox"}
        id={`inline-checkbox-2`}
        onChange={handleCheckBox}
        defaultChecked={props.bought}
      />
    </Form>
  );
}
