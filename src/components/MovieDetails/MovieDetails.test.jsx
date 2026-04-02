import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";
import { MemoryRouter } from "react-router-dom";

const mockMovie = {
    title: "Movie Title",
    tagline: "Tagline",
    vote_average: 7,
    vote_count: 200,
    release_date: "2021",
    runtime: 120,
    genres: [{ id: 1, name: "Action" }],
    overview: "Overview text",
    budget: 0,
    revenue: 1000
};

test("renders movie details", () => {
    render(
        <MemoryRouter>
            <MovieDetails movie={mockMovie} previous="/" />
        </MemoryRouter>
    );

    expect(screen.getByText("Movie Title")).toBeInTheDocument();
    expect(screen.getByText("Overview text")).toBeInTheDocument();
});

test("shows N/A when budget is 0", () => {
    render(
        <MemoryRouter>
            <MovieDetails movie={mockMovie} previous="/" />
        </MemoryRouter>
    );

    expect(screen.getByText(/N\/A/)).toBeInTheDocument();
});
