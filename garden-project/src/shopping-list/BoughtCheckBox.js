import Form from "react-bootstrap/Form";

export default function BoughtCheckBox() {
  return (
    <Form>
      <Form.Check
        inline
        label="Bought"
        name="group2"
        type={"checkbox"}
        id={`inline-checkbox-2`}
      />
    </Form>
  );
}
