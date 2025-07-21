import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { AppShell } from "../AppShell";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("AppShell Component", () => {
  it("renders header with app logo", () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("WebApp")).toBeInTheDocument();
  });

  it("renders navbar with navigation items", () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("ダッシュボード")).toBeInTheDocument();
    expect(screen.getByText("分析")).toBeInTheDocument();
    expect(screen.getByText("データ管理")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with custom dimensions", () => {
    render(
      <AppShell headerHeight={80} navbarWidth={250}>
        <div>Custom Layout</div>
      </AppShell>,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("Custom Layout")).toBeInTheDocument();
    expect(screen.getByText("WebApp")).toBeInTheDocument();
  });

  it("has proper structure", () => {
    render(
      <AppShell>
        <div>Structured Content</div>
      </AppShell>,
      { wrapper: TestWrapper }
    );

    // Check for content presence
    expect(screen.getByText("Structured Content")).toBeInTheDocument();
    expect(screen.getByText("WebApp")).toBeInTheDocument();
  });
});
