import { useEffect, useState } from "react";
import { View, FlatList, Button, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameCard from "../components/GameCard";
import { API_ENDPOINTS } from "../config/api";

export default function GameList() {
  const router = useRouter();

  const [games, setGames] = useState([]);
  const [type, setType] = useState("local");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (savedToken) {
        setToken(savedToken);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setToken(null);
      setIsLoggedIn(false);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      let url = "";
      
      if (type === "local") {
        url = API_ENDPOINTS.games;
      } else if (type === "trending") {
        url = API_ENDPOINTS.rawgTrending;
      } else if (type === "upcoming") {
        url = API_ENDPOINTS.rawgUpcoming;
      } else if (type === "top-rated") {
        url = API_ENDPOINTS.rawgTopRated;
      }

      const response = await axios.get(url, { params: { search } });
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [type, search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isLoggedIn ? (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/login")}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        placeholder="Search games..."
        placeholderTextColor="gray"
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.buttonRow}>
        <Button title="MyDB" onPress={() => setType("local")} color={type === "local" ? "#007AFF" : "#555"} />
        <Button title="Trending" onPress={() => setType("trending")} color={type === "trending" ? "#007AFF" : "#555"} />
        <Button title="Upcoming" onPress={() => setType("upcoming")} color={type === "upcoming" ? "#007AFF" : "#555"} />
        <Button title="Top Rated" onPress={() => setType("top-rated")} color={type === "top-rated" ? "#007AFF" : "#555"} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(item: any) => item._id || item.id?.toString()}
          renderItem={({ item }) => (
            <GameCard
              game={item}
              token={token}
              onPress={() =>
                router.push({ pathname: "/gameDetails", params: { id: item._id || item.id } })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: "#2d2d2d",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    color: "white",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    gap: 8,
  },
});
