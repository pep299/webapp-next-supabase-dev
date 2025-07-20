"use client";

import {
  ActionIcon,
  Avatar,
  Group,
  Indicator,
  Menu,
  Text,
  UnstyledButton,
  useMantineColorScheme,
  Box,
} from "@mantine/core";
import {
  IconBell,
  IconLogout,
  IconMoonStars,
  IconSearch,
  IconSettings,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";

interface HeaderProps {
  height?: number;
}

export function Header({ height = 60 }: HeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [notificationCount] = useState(3);

  return (
    <Box
      component="header"
      h={height}
      px="md"
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      <Group justify="space-between" h="100%">
        <Group>
          <Text size="xl" fw={700}>
            WebApp
          </Text>

          <ActionIcon
            variant="light"
            size="lg"
            onClick={() => console.log("Search clicked")}
          >
            <IconSearch size={18} />
          </ActionIcon>
        </Group>

        <Group>
          <Indicator
            inline
            label={notificationCount}
            size={16}
            disabled={notificationCount === 0}
          >
            <ActionIcon variant="light" size="lg">
              <IconBell size={18} />
            </ActionIcon>
          </Indicator>

          <ActionIcon
            variant="light"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === "dark" ? (
              <IconSun size={18} />
            ) : (
              <IconMoonStars size={18} />
            )}
          </ActionIcon>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <UnstyledButton>
                <Avatar size="sm" radius="xl">
                  <IconUser size={18} />
                </Avatar>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>アカウント</Menu.Label>
              <Menu.Item leftSection={<IconUser size={14} />}>
                プロフィール
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={14} />}>
                設定
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item color="red" leftSection={<IconLogout size={14} />}>
                ログアウト
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Box>
  );
}
