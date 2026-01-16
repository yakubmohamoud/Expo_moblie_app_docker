import { useState, useCallback } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import { useAppDispatch } from '@/store/hooks';
import { setLoading, setError } from './authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    dispatch(setLoading(true));
    try {
      // Firebase login will be implemented in Phase 2
      console.log('Login attempt:', { email, password });
      Alert.alert('Success', 'Login will be implemented in Phase 2');
      // router.replace('/(tabs)');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(message));
      Alert.alert('Error', message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [email, password, dispatch, router]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Login
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')}>
        <ThemedText style={styles.link}>Don't have an account? Sign up</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#007AFF',
    marginTop: 16,
    textAlign: 'center',
  },
});
