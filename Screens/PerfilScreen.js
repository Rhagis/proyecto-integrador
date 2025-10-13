import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function PerfilScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // cargar datos guardados del perfil
      const data = await AsyncStorage.getItem("@perfil");
      if (data) {
        setPerfil(JSON.parse(data));
      }

      // obtener ubicación actual
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      } else {
        alert("No se concedieron permisos de ubicación.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>

      {perfil?.foto ? (
        <Image source={{ uri: perfil.foto }} style={styles.foto} />
      ) : (
        <View style={[styles.foto, styles.fotoVacia]}>
          <Text style={{ color: "#888" }}>Sin foto</Text>
        </View>
      )}

      <Text style={styles.texto}>Nombre: {perfil?.nombre || "No definido"}</Text>
      <Text style={styles.texto}>Apellido: {perfil?.apellido || "No definido"}</Text>
      <Text style={styles.texto}>Edad: {perfil?.edad || "No definida"}</Text>

      {location ? (
        <>
          <Text style={styles.coordenadas}>
            Latitud: {location.latitude.toFixed(5)}
          </Text>
          <Text style={styles.coordenadas}>
            Longitud: {location.longitude.toFixed(5)}
          </Text>

          <TouchableOpacity
            style={[styles.boton, { backgroundColor: "#2ecc71" }]}
            onPress={() => setMapVisible(true)}
          >
            <Text style={styles.botonTexto}>Ver en mapa</Text>
          </TouchableOpacity>

        </>
      ) : (
        <Text style={styles.coordenadas}>Ubicación no disponible</Text>
      )}

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("Editar Perfil")}
      >
        <Text style={styles.botonTexto}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Modal con el mapa */}
      <Modal visible={mapVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          {location && (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Tu ubicación"
                description={`${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}
              />
            </MapView>
          )}
          <TouchableOpacity
            style={styles.cerrarMapaBtn}
            onPress={() => setMapVisible(false)}
          >
            <Text style={styles.cerrarMapaTexto}>Cerrar mapa</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d1117",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#e6edf3",
  },
  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#1e90ff",
  },
  fotoVacia: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeaea",
  },
  texto: {
    fontSize: 18,
    marginVertical: 4,
    color: "#e6edf3",
  },
  coordenadas: {
    fontSize: 16,
    color: "#e6edf3",
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cerrarMapaBtn: {
    backgroundColor: "#1e90ff",
    padding: 15,
    alignItems: "center",
  },
  cerrarMapaTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


