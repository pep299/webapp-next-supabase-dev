"use client";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function AdminHome() {
  const showNotification = () => {
    notifications.show({
      title: "Admin Dashboard",
      message: "Mantine UIが管理画面で正常に動作しています！",
      color: "green",
    });
  };

  return (
    <Container size="lg" pt={50}>
      <Title order={1} ta="center" mb={30}>
        Admin Dashboard
      </Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb={15}>
          <Title order={2} size="h3">
            管理者向けダッシュボード
          </Title>
          <Badge color="red" variant="light">
            Admin
          </Badge>
        </Group>

        <Text size="sm" color="dimmed" mb={20}>
          システム管理とユーザー管理を行うダッシュボード
        </Text>

        <Group>
          <Button onClick={showNotification} variant="filled" color="green">
            システム通知
          </Button>
          <Button variant="outline" color="blue">
            ユーザー管理
          </Button>
          <Button variant="light" color="orange">
            設定
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
