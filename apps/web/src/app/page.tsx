"use client";
import { SimpleGrid, Text, Title } from "@mantine/core";
import { IconDashboard, IconTrendingUp, IconUsers } from "@tabler/icons-react";
import { AppShell } from "../components/AppShell";
import { DashboardCard } from "../components/DashboardCard";

export default function Home() {
  return (
    <AppShell>
      <Title order={1} mb="xl">
        ダッシュボード
      </Title>
      
      <Text size="sm" c="dimmed" mb="md">
        システムの主要指標を確認できます
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <DashboardCard
          title="総ユーザー数"
          value="2,847"
          icon={<IconUsers size={18} />}
          change={{ value: 12.5, type: "increase" }}
          badge={{ text: "今月", color: "blue" }}
        />
        
        <DashboardCard
          title="売上"
          value="¥1,234,567"
          icon={<IconTrendingUp size={18} />}
          change={{ value: 8.3, type: "increase" }}
          progress={{ value: 75, color: "green" }}
        />
        
        <DashboardCard
          title="プロジェクト進捗"
          value="進行中"
          icon={<IconDashboard size={18} />}
          ring={{ value: 65, color: "orange", label: "65%" }}
        />
        
        <DashboardCard
          title="アクティブユーザー"
          value="1,456"
          icon={<IconUsers size={18} />}
          change={{ value: 2.1, type: "decrease" }}
          badge={{ text: "24時間", color: "gray" }}
        />
        
        <DashboardCard
          title="完了タスク"
          value="89%"
          icon={<IconDashboard size={18} />}
          progress={{ value: 89, color: "blue" }}
        />
        
        <DashboardCard
          title="顧客満足度"
          value="優秀"
          icon={<IconTrendingUp size={18} />}
          ring={{ value: 92, color: "green", label: "92%" }}
          badge={{ text: "最高評価", color: "green" }}
        />
      </SimpleGrid>
    </AppShell>
  );
}
