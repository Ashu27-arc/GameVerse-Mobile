import { Text, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export default function GameCard({ game, onPress, token }: any) {
  const addFav = async () => {
    if (!token) {
      Alert.alert("Error", "Please login first");
      return;
    }

    try {
      await axios.post(
        API_ENDPOINTS.favourites,
        { gameId: game._id || game.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Added to favourites");
    } catch (error) {
      Alert.alert("Error", "Failed to add to favourites");
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} onLongPress={addFav} style={styles.card}>
      <Image
        source={{ uri: game.image || game.background_image }}
        style={styles.image}
      />
      <Text style={styles.name}>{game.title || game.name}</Text>
      <Text style={styles.rating}>⭐ {game.rating || game.metacritic || "N/A"}</Text>
      <Text style={styles.hint}>❤️ Long press to add</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2d2d2d",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  rating: {
    color: "#fbbf24",
    fontSize: 16,
    marginVertical: 4,
    fontWeight: "600",
  },
  hint: {
    color: "#ef4444",
    fontSize: 13,
    fontStyle: "italic",
  },
});
