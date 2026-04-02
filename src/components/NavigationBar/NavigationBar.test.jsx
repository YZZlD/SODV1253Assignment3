import { render, screen } from "@testing-library/react";
import NavigationBar from "./NavigationBar";
import { MemoryRouter } from "react-router-dom";

test("renders navigation bar", () => {
    render(
        <MemoryRouter>
            <NavigationBar handleSearch={() => {}} />
        </MemoryRouter>
    );

    expect(screen.getByText("Top Rated")).toBeInTheDocument();
    expect(screen.getByText("Genres")).toBeInTheDocument();
});
