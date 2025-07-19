import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="getInOptions"
          options={{ headerShown: false, title: "Get In Options" }}
        />
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "auth" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, title: "main" }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{ headerShown: false, title: "forgot-password" }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaView>
  );
}
export default Layout;