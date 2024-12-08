import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Otp() {
  const router = useRouter();

  async function handleSignIn(userToken: string) {
    await AsyncStorage.setItem('userToken', userToken);
    router.replace('/'); // Navigate to Home
  }  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>SignIn</Text>
      <Button title="Sign In" onPress={()=>handleSignIn("user-12345")} />
    </View>
  );
}