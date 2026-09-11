import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the three input fields", () => {
    render(<App />);

    expect(screen.getByLabelText("Betrag")).toBeTruthy();
    expect(screen.getByLabelText("Trinkgeld-Prozent")).toBeTruthy();
    expect(screen.getByLabelText("Personenzahl")).toBeTruthy();
  });

  it("renders the three output fields", () => {
    render(<App />);

    expect(screen.getByText("Trinkgeld")).toBeTruthy();
    expect(screen.getByText("Gesamtbetrag")).toBeTruthy();
    expect(screen.getByText("Betrag pro Person")).toBeTruthy();
  });

  it("renders no HTML injection markers", () => {
    const { container } = render(<App />);

    expect(container.querySelector("[dangerouslySetInnerHTML]")).toBeNull();
    expect(container.innerHTML).not.toContain("<script");
  });
});
