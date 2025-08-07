import React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import BlockAnnouncement from "../index";

vi.useFakeTimers();

describe("BlockAnnouncement", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the banner with heading", () => {
    render(<BlockAnnouncement />);
    expect(screen.getByText(/become a sustainer!/i)).toBeInTheDocument();
  });

//   it("dismisses the banner when close button is clicked", async () => {
//     render(<BlockAnnouncement />);
    
//     // Wait for isMounted to be true (from useEffect)
//     await act(() => Promise.resolve());

//     const closeButton = screen.getByRole("button", { name: /dismiss banner/i });
//     fireEvent.click(closeButton);

//     // Banner should start fading out
//     expect(
//       screen.getByText(/become a sustainer!/i).closest("div")
//     ).toHaveClass("opacity-0");

//     // Advance timers to trigger setTimeout logic
//     act(() => {
//       vi.advanceTimersByTime(700);
//     });

//     // Banner should now be removed
//     expect(screen.queryByText(/become a sustainer!/i)).not.toBeInTheDocument();
//   });
});
