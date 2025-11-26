import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.gameById(id as string));
        setGame(response.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Game not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: game.image || game.background_image }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{game.title || game.name}</Text>
        <Text style={styles.genre}>{game.genre || "Action"}</Text>
        <Text style={styles.rating}>⭐ {game.rating || game.metacritic || "N/A"}</Text>
        {game.description && (
          <Text style={styles.description}>{game.description}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genre: {
    color: "#9ca3af",
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    color: "#fbbf24",
    fontSize: 22,
    marginBottom: 15,
    fontWeight: "600",
  },
  description: {
    color: "#d1d5db",
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: "white",
    fontSize: 18,
  },
});
