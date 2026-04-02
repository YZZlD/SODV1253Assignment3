import { render, screen, waitFor } from "@testing-library/react";
import MovieModal from "./MovieModal";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

vi.mock("../../utils/APICalls", () => ({
    getMovieByID: vi.fn(() =>
        Promise.resolve({ title: "Loaded Movie",
            budget: 0,
            revenue: 0,
            vote_average: 7,
            vote_count: 100,
            release_date: "2020",
            runtime: 120,
            genres: [],
            overview: "Test overview" })
    )
}));

test("shows loading then movie", async () => {
    render(
        <MemoryRouter initialEntries={["/movies/1"]}>
            <Routes>
                <Route path="/movies/:id" element={<MovieModal />} />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText("Loaded Movie")).toBeInTheDocument();
    });
});
