import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Stack, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { checkCookiesAndRedirect } from "../networking";
import "./login.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function checkUserDetails(email, password) {
    let response;
    if (email === "" && password === "") {
      setError("Please enter a username and password");
    } else if (email === "") {
      setError("Please enter a username");
    } else if (password === "") {
      setError("Please enter a password");
    } else {
      response = await fetch(`https://garden-project.sigmalabs.co.uk/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
    }
    return await response.json();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await checkUserDetails(email, password);

    if (response.session) {
      document.cookie = "session=" + (await response).session;
      navigate("/dashboard");
    } else {
      alert(response.response);
    }
  }

  return (
    <div className="login-form-container">
      <h1>GRDN</h1>
      <Form className="login-form">
        <h2 id="login-h2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={(e) => {
              e.preventDefault();
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
              data-testid="login-test-btn"
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
