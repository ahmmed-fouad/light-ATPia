import { Stack } from "expo-router";

const Layout=()=> {

  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="login"
        options={{ headerShown: false, title: "auth" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: false, title: "main" }}
      />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
export default Layout;