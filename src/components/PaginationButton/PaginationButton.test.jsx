import { render, screen, fireEvent } from "@testing-library/react";
import PaginationButton from "./PaginationButton";
import {vi} from "vitest";

test("renders button and handles click", () => {
    const mockFn = vi.fn();

    render(<PaginationButton message="Next" handlePageChange={mockFn} />);

    const btn = screen.getByText("Next");
    fireEvent.click(btn);

    expect(mockFn).toHaveBeenCalled();
});
