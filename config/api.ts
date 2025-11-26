// API Configuration
// For Android Emulator: use 10.0.2.2
// For iOS Simulator: use localhost
// For Physical Device: use your computer's IP address

export const API_BASE_URL = "http://192.168.1.13:5000/api";

export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/auth/login`,
  register: `${API_BASE_URL}/auth/register`,
  
  // Games
  games: `${API_BASE_URL}/games`,
  gameById: (id: string) => `${API_BASE_URL}/games/${id}`,
  
  // Favourites
  favourites: `${API_BASE_URL}/favourites`,
  
  // RAWG API
  rawgTrending: `${API_BASE_URL}/rawg/trending`,
  rawgUpcoming: `${API_BASE_URL}/rawg/upcoming`,
  rawgTopRated: `${API_BASE_URL}/rawg/top-rated`,
};
