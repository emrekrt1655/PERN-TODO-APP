import { render, screen } from "@testing-library/react";
import HomepageLogout from "../HomepageLogout";
import { Router } from "react-router-dom";
import { TodoContextProvider } from "../../context/TodoContext";

describe("HomepageLogout", () => {
  test("should render", () => {
    render(
      <Router>
        <HomepageLogout />
      </Router>
    ),
      {
        wrapper: TodoContextProvider,
      };
    const headElement = screen.getByText("Make some effort and be better");
    expect(headElement).toBeInDocument();
  });
});
