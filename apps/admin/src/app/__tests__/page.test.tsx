import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import AdminHome from "../page";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("Admin Home Page", () => {
  it("renders admin dashboard heading", () => {
    render(<AdminHome />, { wrapper: TestWrapper });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Admin Dashboard");
  });

  it("renders description text", () => {
    render(<AdminHome />, { wrapper: TestWrapper });

    const description = screen.getByText("管理者向けダッシュボード");
    expect(description).toBeInTheDocument();
  });

  it("renders admin badge", () => {
    render(<AdminHome />, { wrapper: TestWrapper });

    const badge = screen.getByText("Admin");
    expect(badge).toBeInTheDocument();
  });

  it("renders Mantine UI buttons", () => {
    render(<AdminHome />, { wrapper: TestWrapper });

    expect(
      screen.getByRole("button", { name: "システム通知" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ユーザー管理" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "設定" })).toBeInTheDocument();
  });

  it("has proper Container structure", () => {
    render(<AdminHome />, { wrapper: TestWrapper });

    const container = screen.getByText("Admin Dashboard").closest("div");
    expect(container).toBeInTheDocument();
  });
});
