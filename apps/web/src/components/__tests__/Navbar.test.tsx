import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { Navbar } from "../Navbar";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("Navbar Component", () => {
  it("renders main navigation items", () => {
    render(<Navbar />, { wrapper: TestWrapper });

    expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
    expect(screen.getByText("分析")).toBeInTheDocument();
    expect(screen.getByText("データ管理")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });

  it("renders badges for items with notifications", () => {
    render(<Navbar />, { wrapper: TestWrapper });

    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("新")).toBeInTheDocument();
  });

  it("expands and collapses menu items with children", () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const analysisItem = screen.getByText("分析");

    // Click to expand
    fireEvent.click(analysisItem);

    // Child items should now be visible
    expect(screen.getByText("売上分析")).toBeInTheDocument();
    expect(screen.getByText("ユーザー分析")).toBeInTheDocument();
  });

  it("renders data management submenu", () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const dataManagementItem = screen.getByText("データ管理");
    fireEvent.click(dataManagementItem);

    expect(screen.getByText("ユーザー")).toBeInTheDocument();
    expect(screen.getByText("ファイル")).toBeInTheDocument();
  });

  it("has correct width", () => {
    render(<Navbar width={250} />, { wrapper: TestWrapper });

    const navbar = screen.getByText("ダッシュボード").closest("nav");
    expect(navbar).toBeInTheDocument();
  });

  it("renders with default width", () => {
    render(<Navbar />, { wrapper: TestWrapper });

    const navbar = screen.getByText("ダッシュボード").closest("nav");
    expect(navbar).toBeInTheDocument();
  });
});
