import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { vi } from "vitest";

test("calls handleSearch on submit", () => {
    const mockSearch = vi.fn();

    render(<SearchBar handleSearch={mockSearch} />);

    const input = screen.getByPlaceholderText("Search for a movie...");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "Batman" } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith("Batman");
});
