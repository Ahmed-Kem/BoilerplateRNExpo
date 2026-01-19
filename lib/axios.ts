import { client } from "@/api-client/client.gen";
import * as SecureStore from "expo-secure-store";

client.setConfig({
  baseUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000",
});

// Intercepteur pour ajouter le token d'authentification et headers ngrok
client.interceptors.request.use(async (request) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
  // Ajouter le header pour éviter l'avertissement ngrok
  request.headers.set("ngrok-skip-browser-warning", "");
  return request;
});

client.interceptors.response.use((response) => response);

export default client;
