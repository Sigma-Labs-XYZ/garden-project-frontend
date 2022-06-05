import { Container, Form, Button, Alert, Stack } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./create-account.css";

export default function CreateAccountForm() {
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [errPass, setErrPass] = useState(false);
  const [errUsername, setErrUsername] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(props) {
    //    const result =   /// need to fill in with fetch request
    // if (result.status === 200) {
    //   navigate("/");
    // } else {
    //   setErrUsername(result.response);
    // }
  }

  function getErrMessage(err) {
    return (
      <Alert key={"danger"} variant={"danger"}>
        {err}
      </Alert>
    );
  }
  return (
    <div className="create-account-container">
      <h1>Website name</h1>
      <h2>Welcome</h2>

      <Form className="create-account-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h4 className="create-account-title"> Create an account</h4>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            onChange={(e) => {
              e.target.value === ""
                ? setErrUsername("Empty Username!")
                : setErrUsername(false);
              setCreateUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={async (e) => setCreatePassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => {
              e.preventDefault();
              e.target.value === createPassword
                ? setErrPass(false)
                : setErrPass("Password doesn't match!");
            }}
          />
        </Form.Group>
        {errPass ? getErrMessage(errPass) : null}
        {errUsername ? getErrMessage(errUsername) : null}
        <div className="d-flex justify-content-between">
          <Stack direction="vertical" gap={3}>
            <Button variant="info" type="submit" onClick={handleSubmit}>
              Create Account
            </Button>

            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                navigate("/");
              }}
            >
              Log In
            </Button>
          </Stack>
        </div>
      </Form>
    </div>
  );
}
