import { StyleSheet } from 'react-native';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';

export default function ClientDashboard() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Client Dashboard
      </ThemedText>
      <ThemedText>Submit tailoring jobs and browse quotes from tailors</ThemedText>
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
