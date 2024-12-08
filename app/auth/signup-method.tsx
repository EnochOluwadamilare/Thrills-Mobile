import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupMethod() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select your Signup Method</Text>
      <Button title="Continue to Signup" onPress={() => router.push('/auth/signup')} />
    </View>
  );
}