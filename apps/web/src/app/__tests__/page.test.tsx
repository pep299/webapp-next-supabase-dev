import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import Home from "../page";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("Home Page", () => {
  it("renders main heading", () => {
    render(<Home />, { wrapper: TestWrapper });

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Next.js + Supabase Web App");
  });

  it("renders description text", () => {
    render(<Home />, { wrapper: TestWrapper });

    const description = screen.getByText(
      "モダンなフルスタックWebアプリケーション"
    );
    expect(description).toBeInTheDocument();
  });

  it("renders Mantine UI components", () => {
    render(<Home />, { wrapper: TestWrapper });

    expect(screen.getByText("Mantine UI Test")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "通知テスト" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "成功ボタン" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "キャンセル" })
    ).toBeInTheDocument();
  });

  it("has proper Container structure", () => {
    render(<Home />, { wrapper: TestWrapper });

    const container = screen
      .getByText("Next.js + Supabase Web App")
      .closest("div");
    expect(container).toBeInTheDocument();
  });
});
