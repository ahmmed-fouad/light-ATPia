import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        
        <Stack>
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="faq" options={{ headerShown: false }} />
            <Stack.Screen name="pricing" options={{ headerShown: false }} />
        </Stack>
    )
}