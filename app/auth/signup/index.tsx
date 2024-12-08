import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Details</Text>
      <Button title="Verify OTP" onPress={() => router.push('/auth/signup/otp')} />
    </View>
  );
}