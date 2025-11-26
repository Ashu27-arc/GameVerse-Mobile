import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#000" }, headerTintColor: "#fff" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
      <Stack.Screen name="gameList" options={{ title: "🎮 GameVerse" }} />
      <Stack.Screen name="gameDetails" options={{ title: "Game Details" }} />
    </Stack>
  );
}