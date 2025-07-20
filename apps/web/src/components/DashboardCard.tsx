"use client";

import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Menu,
  Progress,
  RingProgress,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconDots,
  IconSettings,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import type React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  progress?: {
    value: number;
    color?: string;
  };
  ring?: {
    value: number;
    color?: string;
    label?: string;
  };
  badge?: {
    text: string;
    color?: string;
  };
}

export function DashboardCard({
  title,
  value,
  icon,
  change,
  progress,
  ring,
  badge,
}: DashboardCardProps) {
  const changeIcon = change?.type === "increase" ? IconArrowUp : IconArrowDown;
  const changeColor = change?.type === "increase" ? "green" : "red";
  const ChangeIcon = changeIcon;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ThemeIcon variant="light" size="lg">
            {icon}
          </ThemeIcon>
          <Text size="sm" fw={500}>
            {title}
          </Text>
        </Group>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconSettings size={14} />}>設定</Menu.Item>
            <Menu.Item leftSection={<IconTrendingUp size={14} />}>
              詳細表示
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Group
        align="flex-end"
        gap="sm"
        mb={change || progress || ring ? "md" : 0}
      >
        <Text size="xl" fw={700}>
          {value}
        </Text>

        {badge && (
          <Badge size="sm" variant="light" color={badge.color || "blue"}>
            {badge.text}
          </Badge>
        )}

        {change && (
          <Group gap={4}>
            <ChangeIcon
              size={16}
              color={changeColor === "green" ? "#51cf66" : "#ff6b6b"}
            />
            <Text size="sm" c={changeColor}>
              {Math.abs(change.value)}%
            </Text>
          </Group>
        )}
      </Group>

      {progress && (
        <Progress
          value={progress.value}
          color={progress.color || "blue"}
          size="sm"
          mb="xs"
        />
      )}

      {ring && (
        <Group justify="center" mt="md">
          <RingProgress
            size={120}
            thickness={8}
            sections={[{ value: ring.value, color: ring.color || "blue" }]}
            label={
              <Text size="xs" ta="center">
                {ring.label || `${ring.value}%`}
              </Text>
            }
          />
        </Group>
      )}
    </Card>
  );
}
