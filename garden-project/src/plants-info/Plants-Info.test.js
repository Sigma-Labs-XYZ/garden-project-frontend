import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PlantsInfoPage from "./PlantsInfoPage";

describe("Plant-Info", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "status=active",
    });
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("Search for a plant by name e.g. Angelica, should only return that data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              name: "Angelica",
            },
          ]),
      })
    );

    console.log(document.cookie);
    render(
      <Router>
        <PlantsInfoPage />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText("Search for a plant..."), {
      target: { value: "angelica" },
    });

    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => screen.findByText(), {
      timeout: 2000,
    });

    const message = document.getByClass("accordion-header");
    expect(message.length).toEqual(1);
  });
});
