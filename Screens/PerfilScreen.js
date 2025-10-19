import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function PerfilScreen() {
  const [perfil, setPerfil] = useState(null);
  const [coords, setCoords] = useState(null);
  const [obteniendo, setObteniendo] = useState(false);
  const [siguiendo, setSiguiendo] = useState(false);
  const [suscripcion, setSuscripcion] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  //Cargar datos del perfil guardado en AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const cargarPerfil = async () => {
        try {
          //Leer el userId real desde SecureStore
          const userId = await SecureStore.getItemAsync("userToken");
          if (!userId) {
            console.warn("No se encontró userId en SecureStore");
            return;
          }

          //Leer el perfil específico de ese usuario
          const perfilGuardado = await AsyncStorage.getItem(
            `@perfil_${userId}`
          );
          if (perfilGuardado) {
            setPerfil(JSON.parse(perfilGuardado));
          } else {
            // Si no existe, inicializamos con datos vacíos o por defecto
            setPerfil({
              nombre: "Nombre",
              apellido: "Apellido",
              edad: "Edad",
              foto: "",
            });
          }
        } catch (error) {
          console.error("Error al cargar perfil:", error);
        }
      };

      cargarPerfil();
    }, [])
  );

  //Función para solicitar permiso de ubicación
  const solicitarPermiso = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Necesitamos acceso a tu ubicación");
      return false;
    }
    return true;
  };

  //Función para obtener la ubicación actual
  const obtenerUbicacion = async () => {
    const permiso = await solicitarPermiso();
    if (!permiso) return;

    setObteniendo(true);
    try {
      const ubicacion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords(ubicacion.coords);
      console.log(
        "Ubicación obtenida:",
        ubicacion.coords.latitude,
        ubicacion.coords.longitude
      );
    } catch (error) {
      console.error("Error al obtener ubicación:", error);
      Alert.alert("Error", "No se pudo obtener la ubicación");
    } finally {
      setObteniendo(false);
    }
  };

  //Función para iniciar/detener el seguimiento en tiempo real
  const toggleSeguimiento = async () => {
    if (siguiendo) {
      if (suscripcion) {
        suscripcion.remove();
        setSuscripcion(null);
      }
      setSiguiendo(false);
      Alert.alert("Seguimiento detenido");
    } else {
      const permiso = await solicitarPermiso();
      if (!permiso) return;

      try {
        const sub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 3000,
            distanceInterval: 5,
          },
          (ubicacion) => {
            setCoords(ubicacion.coords);
            console.log(
              "Ubicación actualizada:",
              ubicacion.coords.latitude,
              ubicacion.coords.longitude
            );
          }
        );

        setSuscripcion(sub);
        setSiguiendo(true);
        Alert.alert(
          "Seguimiento iniciado",
          "La ubicación se actualizará automáticamente"
        );
      } catch (error) {
        console.error("Error en seguimiento:", error);
        Alert.alert("Error", "No se pudo iniciar el seguimiento");
      }
    }
  };

  //Función para limpiar la ubicación y detener el seguimiento
  const limpiarUbicacion = () => {
    setCoords(null);
    if (suscripcion) {
      suscripcion.remove();
      setSuscripcion(null);
    }
    setSiguiendo(false);
  };

  if (!perfil) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Perfil */}
      <View style={styles.profileContainer}>
        {perfil?.foto ? (
          <Image source={{ uri: perfil.foto }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.fotoVacia]}>
            <Text style={{ color: "#020000ff" }}>Sin foto</Text>
          </View>
        )}
        <Text style={styles.profileName}>
          {perfil.nombre} {perfil.apellido}
        </Text>
        <Text style={styles.profileAge}>Edad: {perfil.edad} años</Text>
      </View>

      {/* Coordenadas */}
      <View style={styles.coordsContainer}>
        {coords ? (
          <>
            <Text style={styles.coordsTitle}>Tu ubicación:</Text>
            <Text style={styles.coordText}>
              Latitud: {coords.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordText}>
              Longitud: {coords.longitude.toFixed(6)}
            </Text>
            <Text style={styles.coordText}>
              Precisión: {coords.accuracy?.toFixed(2)} metros
            </Text>
            {siguiendo && (
              <Text style={styles.statusText}>
                Actualizando en tiempo real...
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.noLocationText}>
            {obteniendo ? "Obteniendo ubicación..." : "Sin ubicación"}
          </Text>
        )}
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={obtenerUbicacion}
          disabled={obteniendo}
        >
          <Text style={styles.buttonText}>
            {obteniendo ? "Obteniendo..." : "Obtener Ubicación"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            siguiendo ? styles.stopButton : styles.startButton,
          ]}
          onPress={toggleSeguimiento}
        >
          <Text style={styles.buttonText}>
            {siguiendo ? "Detener Seguimiento" : "Seguir Ubicación"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={limpiarUbicacion}>
          <Text style={styles.buttonText}>Limpiar</Text>
        </TouchableOpacity>

        {coords && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => setMapVisible(true)}
          >
            <Text style={styles.buttonText}>Ver en mapa</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal con el mapa */}
      <Modal visible={mapVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          {coords ? (
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                }}
                title="Tu ubicación"
                description={`${coords.latitude.toFixed(
                  5
                )}, ${coords.longitude.toFixed(5)}`}
              />
            </MapView>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              No hay ubicación para mostrar
            </Text>
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
  profileContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
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
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileAge: {
    fontSize: 16,
    color: "#6c757d",
    marginTop: 4,
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
  coordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#495057",
  },
  coordText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#6c757d",
    fontFamily: "monospace",
  },
  statusText: {
    fontSize: 14,
    color: "#28a745",
    fontWeight: "500",
    marginTop: 10,
  },
  noLocationText: {
    fontSize: 16,
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "90%",
    gap: 12,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#28a745",
  },
  stopButton: {
    backgroundColor: "#dc3545",
  },
  clearButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  mapButton: {
    backgroundColor: "#17a2b8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  cerrarMapaBtn: {
    backgroundColor: "#dc3545",
    padding: 15,
    alignItems: "center",
  },
  cerrarMapaTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
