import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Otp() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Verify Phone Number- OTP Details</Text>
      <Button title="Verify Phone" onPress={() => router.push('/auth/signup/interests')} />
    </View>
  );
}