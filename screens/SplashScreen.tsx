import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if token exists
      const token = await AsyncStorage.getItem("userToken");
      
      // 2 seconds delay for splash effect
      setTimeout(() => {
        // Directly go to GameList (login optional)
        router.replace("/gameList");
      }, 2000);
    } catch (error) {
      console.error("Error checking auth:", error);
      // Still go to GameList even if error
      setTimeout(() => {
        router.replace("/gameList");
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎮</Text>
      <Text style={styles.title}>GameVerse</Text>
      <Text style={styles.subtitle}>Your Gaming Universe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 18,
    fontStyle: "italic",
  },
});
