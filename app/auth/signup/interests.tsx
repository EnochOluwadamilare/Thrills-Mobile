import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Interests() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select Your Interest</Text>
      <Button title="Select Interests" onPress={() => router.push('/auth/signin')} />
    </View>
  );
}