"use client";

import { AppShell as MantineAppShell, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type React from "react";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface AppShellProps {
  children: React.ReactNode;
  headerHeight?: number;
  navbarWidth?: number;
}

export function AppShell({
  children,
  headerHeight = 60,
  navbarWidth = 300,
}: AppShellProps) {
  const [opened] = useDisclosure();

  return (
    <MantineAppShell
      header={{ height: headerHeight }}
      navbar={{
        width: navbarWidth,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header height={headerHeight} />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar>
        <Navbar width={navbarWidth} />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <Box p="md">{children}</Box>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}
