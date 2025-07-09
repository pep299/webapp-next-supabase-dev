import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import Dashboard from "../page";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("Admin Dashboard Page", () => {
  it("renders dashboard heading", () => {
    render(<Dashboard />, { wrapper: TestWrapper });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Admin Dashboard");
  });

  it("shows dashboard path info", () => {
    render(<Dashboard />, { wrapper: TestWrapper });

    const pathInfo = screen.getByText("管理者向けダッシュボード - /dashboard");
    expect(pathInfo).toBeInTheDocument();
  });

  it("shows working status", () => {
    render(<Dashboard />, { wrapper: TestWrapper });

    const status = screen.getByText("✅ Dashboard page is working!");
    expect(status).toBeInTheDocument();
  });

  it("renders Mantine Alert component", () => {
    render(<Dashboard />, { wrapper: TestWrapper });

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("has Container structure", () => {
    render(<Dashboard />, { wrapper: TestWrapper });

    const container = screen.getByText("Admin Dashboard").closest("div");
    expect(container).toBeInTheDocument();
  });
});
