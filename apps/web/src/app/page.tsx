"use client";
import { Button, Card, Container, Group, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function Home() {
  const showNotification = () => {
    notifications.show({
      title: "Mantine UI テスト",
      message: "Mantine UIが正常に動作しています！",
      color: "blue",
    });
  };

  return (
    <Container size="md" pt={50}>
      <Title order={1} ta="center" mb={30}>
        Next.js + Supabase Web App
      </Title>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} size="h3" mb={15}>
          Mantine UI Test
        </Title>
        <Text size="sm" color="dimmed" mb={20}>
          モダンなフルスタックWebアプリケーション
        </Text>

        <Group>
          <Button onClick={showNotification} variant="filled">
            通知テスト
          </Button>
          <Button variant="outline" color="green">
            成功ボタン
          </Button>
          <Button variant="light" color="red">
            キャンセル
          </Button>
        </Group>
      </Card>
    </Container>
  );
}
