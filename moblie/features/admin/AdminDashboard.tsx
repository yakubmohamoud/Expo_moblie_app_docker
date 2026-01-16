import { StyleSheet } from 'react-native';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';

export default function AdminDashboard() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Admin Dashboard
      </ThemedText>
      <ThemedText>Manage platform, users, and disputes</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
  },
});
