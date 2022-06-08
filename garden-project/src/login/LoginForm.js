import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { Form, Stack, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import "./login.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function checkUserDetails(email, password) {
    const submittedUserDetails = { email: email, password: password };

    let response;
    if (email === "" && password === "") {
      await updateError("Please enter a username and password");
    } else if (email === "") {
      await updateError("Please enter a username");
    } else if (password === "") {
      await updateError("Please enter a password");
    } else {
      response = await fetch(`https://garden-project.sigmalabs.co.uk/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submittedUserDetails }),
      });

      const result = await response.json();
      return result;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = checkUserDetails(email, password);

    if (result.error) {
      updateError(result.error);
    } else {
      navigate("/dashboard");
    }
  }

  async function updateError(error) {
    await setError(error);
  }

  return (
    <div className="login-form-container">
      <h1>Website Name</h1>
      <Form className="login-form">
        <h2 id="login-h2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Please enter the email address you used to register
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Stack id="login-btn-stack" direction="vertical" gap={3}>
            <Button
              className="login-btn"
              variant="info"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <p id="or">or</p>

            <Button
              className="create-account-btn"
              variant="primary"
              type="submit"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Create Account
            </Button>
          </Stack>
        </div>
      </Form>
    </div>
  );
}
