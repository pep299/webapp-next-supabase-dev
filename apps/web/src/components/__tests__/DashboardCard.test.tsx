import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { IconUsers } from "@tabler/icons-react";
import type React from "react";
import { describe, expect, it } from "vitest";
import { DashboardCard } from "../DashboardCard";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("DashboardCard Component", () => {
  it("renders basic card with title and value", () => {
    render(
      <DashboardCard
        title="ユーザー数"
        value="1,234"
        icon={<IconUsers size={16} />}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("ユーザー数")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("displays increase change indicator", () => {
    render(
      <DashboardCard
        title="売上"
        value="¥100,000"
        icon={<IconUsers size={16} />}
        change={{ value: 12.5, type: "increase" }}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("12.5%")).toBeInTheDocument();
  });

  it("displays decrease change indicator", () => {
    render(
      <DashboardCard
        title="コスト"
        value="¥50,000"
        icon={<IconUsers size={16} />}
        change={{ value: 5.2, type: "decrease" }}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("5.2%")).toBeInTheDocument();
  });

  it("renders progress bar", () => {
    render(
      <DashboardCard
        title="進捗"
        value="75%"
        icon={<IconUsers size={16} />}
        progress={{ value: 75, color: "green" }}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("進捗")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders ring progress", () => {
    render(
      <DashboardCard
        title="完了率"
        value="データ"
        icon={<IconUsers size={16} />}
        ring={{ value: 85, color: "blue", label: "85%" }}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("完了率")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("renders badge", () => {
    render(
      <DashboardCard
        title="ステータス"
        value="アクティブ"
        icon={<IconUsers size={16} />}
        badge={{ text: "新機能", color: "green" }}
      />,
      { wrapper: TestWrapper }
    );

    expect(screen.getByText("新機能")).toBeInTheDocument();
  });

  it("opens settings menu on dots click", () => {
    render(
      <DashboardCard
        title="テスト"
        value="値"
        icon={<IconUsers size={16} />}
      />,
      { wrapper: TestWrapper }
    );

    const dotsButton = screen.getByRole("button");
    fireEvent.click(dotsButton);

    // Menu opens but content might be rendered in portal
    expect(dotsButton).toHaveAttribute("aria-expanded", "true");
  });
});
