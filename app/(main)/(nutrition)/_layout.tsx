import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="days-meals" options={{ headerShown: false }} />
      <Stack.Screen name="personal-program" options={{ headerShown: false }} />
      <Stack.Screen name="breakfast" options={{ headerShown: false }} />
      <Stack.Screen name="lunch" options={{ headerShown: false }} />
      <Stack.Screen name="diner" options={{ headerShown: false }} />
    </Stack>
  );
}