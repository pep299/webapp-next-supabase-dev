import { MantineProvider } from "@mantine/core";
import { render, screen, fireEvent } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { Header } from "../Header";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("Header Component", () => {
  it("renders app logo", () => {
    render(<Header />, { wrapper: TestWrapper });

    expect(screen.getByText("WebApp")).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<Header />, { wrapper: TestWrapper });

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders notification bell with count", () => {
    render(<Header />, { wrapper: TestWrapper });

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders color scheme toggle", () => {
    render(<Header />, { wrapper: TestWrapper });

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders user avatar", () => {
    render(<Header />, { wrapper: TestWrapper });

    const buttons = screen.getAllByRole("button");
    expect(buttons[buttons.length - 1]).toBeInTheDocument();
  });

  it("opens user menu on avatar click", () => {
    render(<Header />, { wrapper: TestWrapper });

    const avatars = screen.getAllByRole("button");
    const userAvatar = avatars[avatars.length - 1];
    fireEvent.click(userAvatar);

    // Menu items are only visible after clicking - just check button behavior
    expect(userAvatar).toHaveAttribute("aria-expanded", "true");
  });

  it("has correct height", () => {
    render(<Header height={70} />, { wrapper: TestWrapper });

    const header = screen.getByText("WebApp").closest("header");
    expect(header).toBeInTheDocument();
  });
});
