import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the QuickPlate home page", () => {
  render(<App />);

  const heading = screen.getByRole("heading", {
    name: /find your next meal/i,
  });

  expect(heading).toBeInTheDocument();
});