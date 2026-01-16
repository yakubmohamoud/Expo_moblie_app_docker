import { StyleSheet } from 'react-native';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';

export default function TailorDashboard() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Tailor Dashboard
      </ThemedText>
      <ThemedText>View available jobs and submit quotes</ThemedText>
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
