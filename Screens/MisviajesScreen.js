/*export default function MisViajesScreen(){
    return 'hola'
}*/

import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

export default function MisViajesScreen() {
  const [viajes, setViajes] = useState([]);

  // Cargar viajes al enfocar la pantalla
  /*useFocusEffect(
    useCallback(() => {
      const cargarViajes = async () => {
        try {
          const data = await AsyncStorage.getItem("@viajes");
          if (data) setViajes(JSON.parse(data));
        } catch (error) {
          console.error("Error al cargar viajes:", error);
        }
      };
      cargarViajes();
    }, [])
  );*/

  useFocusEffect(
    useCallback(() => {
      const cargarViajes = async () => {
        try {
          const userId = await SecureStore.getItemAsync("userToken"); // ✅ ID real del usuario
          if (!userId) {
            console.warn("No se encontró userId en SecureStore");
            return;
          }

          const data = await AsyncStorage.getItem(`@viajes_${userId}`); // ✅ clave única por usuario
          if (data) setViajes(JSON.parse(data));
          else setViajes([]); // si no hay datos, lista vacía
        } catch (error) {
          console.error("Error al cargar viajes:", error);
        }
      };
      cargarViajes();
    }, [])
  );

  /*const eliminarViaje = async (id) => {
    Alert.alert(
      "Eliminar viaje",
      "¿Seguro que deseas eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const nuevosViajes = viajes.filter((v) => v.id !== id);
            setViajes(nuevosViajes);
            await AsyncStorage.setItem("@viajes", JSON.stringify(nuevosViajes));
          },
        },
      ]
    );
  };*/

  const eliminarViaje = async (id) => {
    Alert.alert(
      "Eliminar viaje",
      "¿Seguro que deseas eliminar este registro?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const userId = await SecureStore.getItemAsync("userToken"); // ✅ usar siempre el mismo ID
              if (!userId) return;

              const nuevosViajes = viajes.filter((v) => v.id !== id);
              setViajes(nuevosViajes);
              await AsyncStorage.setItem(`@viajes_${userId}`, JSON.stringify(nuevosViajes)); // ✅ guardar por usuario
            } catch (error) {
              console.error("Error al eliminar viaje:", error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.viajeItem}>
      <View>
        <Text style={styles.viajeFecha}>{item.fecha}</Text>
        <Text style={styles.viajeTexto}>Lat: {item.latitud.toFixed(6)}</Text>
        <Text style={styles.viajeTexto}>Lon: {item.longitud.toFixed(6)}</Text>
      </View>
      <TouchableOpacity style={styles.borrarBtn} onPress={() => eliminarViaje(item.id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Viajes</Text>

      {viajes.length === 0 ? (
        <Text style={{ color: "#aaa", fontSize: 16 }}>No hay viajes guardados</Text>
      ) : (
        <FlatList
          data={viajes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

// estilos reutilizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#e6edf3",
    textAlign: "center",
  },
  viajeItem: {
    backgroundColor: "#161b22",
    borderWidth: 1,
    borderColor: "#30363d",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viajeTexto: {
    color: "#e6edf3",
    fontSize: 15,
    marginTop: 4,
  },
  viajeFecha: {
    color: "#58a6ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  borrarBtn: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});