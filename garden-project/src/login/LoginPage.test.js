import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "./LoginPage.js";
import { BrowserRouter as Router } from "react-router-dom";

describe("LoginPage", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("Should give the sessionID if successfully logged in", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            response: "Username or password is incorrect.",
          }),
      })
    );
    const { container, getByPlaceholderText, getByText, findByDisplayValue } =
      render(
        <Router>
          <LoginPage />
        </Router>
      );
    fireEvent.click(screen.getByTestId("login-test-btn"));
    console.log(container);

    expect(container).toHaveTextContent(/DashboardPage/);
  });
});
