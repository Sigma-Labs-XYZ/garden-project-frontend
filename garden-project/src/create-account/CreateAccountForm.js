import { Form, Button, Alert, Stack, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./create-account.css";

export default function CreateAccountForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errPass, setErrPass] = useState(false);
  const [errUsername, setErrUsername] = useState(false);
  const navigate = useNavigate();

  async function registerNewUser(
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  ) {
    const newUserDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    const result = await fetch(
      `https://garden-project.sigmalabs.co.uk/sign-up`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserDetails),
      }
    );
    if (result.status === 200) {
      navigate("/dashboard");
    } else {
      setErrUsername(result.response);
    }
  }

  function handleSubmit() {
    registerNewUser(firstName, lastName, email, password, passwordConfirmation);
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
      <h4 className="create-account-title"> Create an account</h4>
      <Form className="create-account-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => {
              e.target.value === ""
                ? setErrUsername("Empty Username!")
                : setErrUsername(false);
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Please enter an email address. We will never share this with anyone
            else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPasswordConfirmation">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => {
              e.preventDefault();
              setPasswordConfirmation(e.target.value);
              e.target.value === password
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
            <p id="or">or</p>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                navigate("/login");
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
