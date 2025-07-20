"use client";

import { Badge, Box, Collapse, Divider, NavLink } from "@mantine/core";
import {
  IconChartBar,
  IconChevronRight,
  IconDatabase,
  IconFiles,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

interface NavbarProps {
  width?: number;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  badge?: string | number;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: "ダッシュボード",
    icon: <IconHome size={16} />,
    href: "/dashboard",
  },
  {
    label: "分析",
    icon: <IconChartBar size={16} />,
    children: [
      {
        label: "売上分析",
        icon: <IconChartBar size={14} />,
        href: "/analytics/sales",
      },
      {
        label: "ユーザー分析",
        icon: <IconUsers size={14} />,
        href: "/analytics/users",
        badge: "新",
      },
    ],
  },
  {
    label: "データ管理",
    icon: <IconDatabase size={16} />,
    children: [
      {
        label: "ユーザー",
        icon: <IconUsers size={14} />,
        href: "/data/users",
        badge: 24,
      },
      {
        label: "ファイル",
        icon: <IconFiles size={14} />,
        href: "/data/files",
      },
    ],
  },
  {
    label: "設定",
    icon: <IconSettings size={16} />,
    href: "/settings",
  },
];

export function Navbar({ width = 300 }: NavbarProps) {
  const [openedItems, setOpenedItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpened = openedItems.includes(item.label);

    return (
      <Box key={item.label}>
        <NavLink
          href={item.href}
          label={item.label}
          leftSection={item.icon}
          rightSection={
            <>
              {item.badge && (
                <Badge size="xs" variant="filled" color="blue">
                  {item.badge}
                </Badge>
              )}
              {hasChildren && (
                <IconChevronRight
                  size={12}
                  style={{
                    transform: isOpened ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 200ms",
                  }}
                />
              )}
            </>
          }
          onClick={hasChildren ? () => toggleItem(item.label) : undefined}
          data-level={level}
          style={{
            paddingLeft: `${16 + level * 16}px`,
          }}
        />

        {hasChildren && (
          <Collapse in={isOpened}>
            {item.children?.map((child) => renderNavItem(child, level + 1))}
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box
      component="nav"
      w={width}
      h="100vh"
      style={{
        borderRight: "1px solid #e9ecef",
        overflowY: "auto",
      }}
    >
      <Box p="md">
        {navItems.map((item, index) => (
          <Box key={item.label}>
            {renderNavItem(item)}
            {index < navItems.length - 1 && <Divider my="sm" />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
