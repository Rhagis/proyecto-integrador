import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function NuevoViajeScreen({ navigation }) {
  const [coords, setCoords] = useState(null);
  const [guardando, setGuardando] = useState(false);

  // Función para solicitar permiso de ubicación
  const solicitarPermiso = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a tu ubicación");
      return false;
    }
    return true;
  };

  // Función para obtener la ubicación actual
  const obtenerUbicacion = async () => {
    const permiso = await solicitarPermiso();
    if (!permiso) return;

    setGuardando(true);
    try {
      const ubicacion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCoords(ubicacion.coords);
      Alert.alert("Ubicación obtenida", "Puedes guardar tu viaje ahora.");
    } catch (error) {
      console.error("Error al obtener ubicación:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación");
    } finally {
      setGuardando(false);
    }
  };
  // Función para guardar el viaje
  const guardarViaje = async () => {
    if (!coords) {
      Alert.alert("Sin ubicación", "Primero obtén tu ubicación actual");
      return;
    }

    try {
      //Obtener el ID del usuario actual desde SecureStore
      const userId = await SecureStore.getItemAsync("userToken");
      if (!userId) {
        Alert.alert("Error", "No se encontró el usuario activo.");
        return;
      }

      //Leer los viajes del usuario específico
      const data = await AsyncStorage.getItem(`@viajes_${userId}`);
      const viajes = data ? JSON.parse(data) : [];

      const nuevoViaje = {
        id: Date.now(),
        fecha: new Date().toLocaleString(),
        latitud: coords.latitude,
        longitud: coords.longitude,
      };

      const nuevosViajes = [...viajes, nuevoViaje];

      //Guardar los viajes con la clave del usuario actual
      await AsyncStorage.setItem(
        `@viajes_${userId}`,
        JSON.stringify(nuevosViajes)
      );

      Alert.alert("Éxito", "Viaje guardado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar viaje:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuevo Viaje</Text>

      {coords ? (
        <View style={styles.coordsContainer}>
          <Text style={styles.coordText}>
            Latitud: {coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordText}>
            Longitud: {coords.longitude.toFixed(6)}
          </Text>
        </View>
      ) : (
        <Text style={{ color: "#aaa", marginBottom: 15 }}>
          No se ha capturado ubicación
        </Text>
      )}

      <TouchableOpacity
        style={styles.mapButton}
        onPress={obtenerUbicacion}
        disabled={guardando}
      >
        <Text style={styles.buttonText}>
          {guardando ? "Obteniendo..." : "Obtener Ubicación"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.startButton} onPress={guardarViaje}>
        <Text style={styles.buttonText}>Guardar Viaje</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>↩ Volver</Text>
      </TouchableOpacity>

      {guardando && (
        <ActivityIndicator
          size="large"
          color="#1e90ff"
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0d1117",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#e6edf3",
    textAlign: "center",
  },
  coordsContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    marginBottom: 30,
    minWidth: "90%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coordText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#6c757d",
    fontFamily: "monospace",
  },
  mapButton: {
    backgroundColor: "#17a2b8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
