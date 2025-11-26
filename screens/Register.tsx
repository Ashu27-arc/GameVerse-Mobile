import { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "../config/api";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Register user
      await axios.post(API_ENDPOINTS.register, { name, email, password });
      
      // Auto login after registration
      const loginResponse = await axios.post(API_ENDPOINTS.login, { email, password });
      const token = loginResponse.data.token;
      
      // Save token
      await AsyncStorage.setItem("userToken", token);
      
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.replace("/gameList") }
      ]);
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      Alert.alert("Registration Failed", message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 GameVerse</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="gray"
        style={styles.input}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

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
        placeholder="Password (min 6 characters)"
        placeholderTextColor="gray"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button 
        title={loading ? "Creating Account..." : "Register"} 
        onPress={handleRegister} 
        disabled={loading} 
      />

      <TouchableOpacity 
        style={styles.loginLink} 
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginTextBold}>Login</Text>
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
  loginLink: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    color: "#9ca3af",
    fontSize: 15,
  },
  loginTextBold: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
});
