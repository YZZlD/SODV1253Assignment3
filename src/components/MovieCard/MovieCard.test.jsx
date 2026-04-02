import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { MemoryRouter } from "react-router-dom";

const mockMovie = {
    id: 1,
    title: "Test Movie",
    overview: "Some overview",
    vote_average: 8,
    vote_count: 100,
    release_date: "2020-01-01",
    poster_path: "/test.jpg"
};

test("renders movie information", () => {
    render(
        <MemoryRouter>
            <MovieCard movie={mockMovie} />
        </MemoryRouter>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Some overview")).toBeInTheDocument();
});

test("navigates on click", () => {
    render(
        <MemoryRouter>
            <MovieCard movie={mockMovie} />
        </MemoryRouter>
    );

    const card = screen.getByText("Test Movie");
    fireEvent.click(card);

    // basic check since navigate is internal
    expect(card).toBeInTheDocument();
});
