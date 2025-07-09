import { Alert, Container, Text, Title } from "@mantine/core";

export default function Dashboard() {
  return (
    <Container size="md" pt={50}>
      <Title order={1} ta="center" mb={30}>
        Admin Dashboard
      </Title>

      <Text ta="center" color="dimmed" mb={30}>
        管理者向けダッシュボード - /dashboard
      </Text>

      <Alert color="blue" title="Dashboard Status">
        ✅ Dashboard page is working!
      </Alert>
    </Container>
  );
}
