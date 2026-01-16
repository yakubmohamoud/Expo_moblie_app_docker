import { useState, useCallback } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/themed-text';
import ThemedView from '@/components/themed-view';
import { useAppDispatch } from '@/store/hooks';
import { setLoading, setError } from './authSlice';
import { validateEmail, validatePassword } from '@/utils/validators';

type UserRole = 'client' | 'tailor' | 'admin';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignup = useCallback(async () => {
    if (!email || !password || !displayName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      Alert.alert('Error', passwordValidation.errors.join('\n'));
      return;
    }

    dispatch(setLoading(true));
    try {
      // Firebase signup will be implemented in Phase 2
      console.log('Signup attempt:', { email, displayName, role });
      Alert.alert('Success', 'Signup will be implemented in Phase 2');
      // router.replace('/(tabs)');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      dispatch(setError(message));
      Alert.alert('Error', message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [email, password, displayName, role, dispatch, router]);

  const roles: UserRole[] = ['client', 'tailor', 'admin'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.innerContainer}>
        <ThemedText type="title" style={styles.title}>
          Sign Up
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={displayName}
          onChangeText={setDisplayName}
        />

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

        <ThemedText style={styles.label}>User Role</ThemedText>
        <ThemedView style={styles.roleContainer}>
          {roles.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleButton, role === r && styles.roleButtonActive]}
              onPress={() => setRole(r)}
            >
              <ThemedText style={role === r ? styles.roleTextActive : styles.roleText}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <ThemedText style={styles.buttonText}>Create Account</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <ThemedText style={styles.link}>Already have an account? Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  roleText: {
    color: '#666',
  },
  roleTextActive: {
    color: '#fff',
    fontWeight: '600',
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
