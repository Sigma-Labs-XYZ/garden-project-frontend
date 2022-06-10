import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateAccountForm from "./CreateAccountForm";

describe("Create-Account", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("If passwords don't match, Error message doesn't match", async () => {
    const serverMessage = "Passwords do not match, please try again";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "Passwords do not match, please try again",
          }),
      })
    );
    render(
      <Router>
        <CreateAccountForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "James" },
    });
    // console.log(screen.getByLabelText("First name"), {
    //   target: { value: "Arthur" },
    // });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Arthur" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "user@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => screen.findByText(serverMessage), {
      timeout: 2000,
    });
    const message = screen.getByText(serverMessage);
    expect(message).toBeInTheDocument();
  });

  test("If any variable is empty, return a error message", async () => {
    const serverMessage = "Please provide all data required!";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "Please provide all data required!",
          }),
      })
    );
    render(
      <Router>
        <CreateAccountForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "James" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Arthur" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "user@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => screen.findByText(serverMessage), {
      timeout: 2000,
    });
    const message = screen.getByText(serverMessage);
    expect(message).toBeInTheDocument();
  });

  test("If email exists throw a error message to say account exists already", async () => {
    const serverMessage = "An account already exists for this email!";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "An account already exists for this email!",
          }),
      })
    );
    render(
      <Router>
        <CreateAccountForm />
      </Router>
    );
    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "James" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Arthur" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "user@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => screen.findByText(serverMessage), {
      timeout: 2000,
    });
    const message = screen.getByText(serverMessage);
    expect(message).toBeInTheDocument();
  });

  //   test("Create an account if it passes all the validations", async () => {
  //     const serverMessage = "Account created!";
  //     global.fetch = jest.fn(() =>
  //       Promise.resolve({
  //         json: () =>
  //           Promise.resolve({
  //             response: "Account created!",
  //           }),
  //       })
  //     );
  //     render(
  //       <Router>
  //         <CreateAccountForm />
  //       </Router>
  //     );
  //     fireEvent.change(screen.getByLabelText("First name"), {
  //       target: { value: "James" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Last name"), {
  //       target: { value: "Arthur" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Username"), {
  //       target: { value: "newuser@email.com" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Password"), {
  //       target: { value: "password" },
  //     });
  //     fireEvent.change(screen.getByLabelText("Confirm Password"), {
  //       target: { value: "password" },
  //     });
  //     fireEvent.click(screen.getByText("Create Account"));

  //     await waitFor(() => screen.findByText(serverMessage), {
  //       timeout: 2000,
  //     });
  //     const message = screen.getByText(serverMessage);
  //     // expect(message).toBeInTheDocument();
  //   });
});
