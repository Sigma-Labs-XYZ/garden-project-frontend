import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Form, Stack, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import "./login.css";
export default function LoginForm() {
  let navigate = useNavigate();
  const [error, setError] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     if (username === "" && password === "") {
  //       await updateError("Please enter a username and password");
  //     } else if (username === "") {
  //       await updateError("Please enter a username");
  //     } else if (password === "") {
  //       await updateError("Please enter a password");
  //       } else {
  //         const result =// fetch request;
  //         if (result.status === 200) {
  //           navigate("/search");
  //         } else {
  //           await updateError(result.response);
  //         }
  //     }

  //     async function updateError(error) {
  //       setError(error);
  //     }

  return (
    <div className="login-form-container">
      <h1>Website Name</h1>
      <Form className="login-form">
        <h2 id="login-h2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Stack direction="vertical" gap={3}>
          <Button variant="info" type="submit">
            Login
          </Button>
          <p id="or">or</p>
          <Link to="/sign-up">
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Link>
        </Stack>
      </Form>
    </div>
  );
}
