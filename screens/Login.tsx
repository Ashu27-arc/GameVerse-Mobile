import { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "../config/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_ENDPOINTS.login, { email, password });
      const token = response.data.token;
      
      // Save token to AsyncStorage for persistent login
      await AsyncStorage.setItem("userToken", token);
      
      // Navigate to game list
      router.replace("/gameList");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 GameVerse</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="gray"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} />

      <TouchableOpacity 
        style={styles.registerLink} 
        onPress={() => router.replace("/register")}
      >
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.registerTextBold}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2d2d2d",
    padding: 16,
    color: "white",
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  registerLink: {
    marginTop: 24,
    alignItems: "center",
  },
  registerText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  registerTextBold: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
});
