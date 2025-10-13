/*import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function PerfilScreen({ navigation }) {
  /*const [perfil, setPerfil] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);

  // Estado para almacenar las coordenadas
    const [coords, setCoords] = useState(null);
    // Estado para mostrar si está obteniendo ubicación
    const [obteniendo, setObteniendo] = useState(false);
    // Estado para el seguimiento en tiempo real
    const [siguiendo, setSiguiendo] = useState(false);
    // Variable para almacenar la suscripción
    const [suscripcion, setSuscripcion] = useState(null);

  /*useEffect(() => {
    cargarDatos();
  }, []);*/

  //Solicita permisos
  /*const solicitarPermiso = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
            return false;
        }
        return true;
    };

  //obtener ubicacion actual una sola vez
  const obtenerUbicacion = async () => {
        const permiso = await solicitarPermiso();
        if (!permiso) return;

        setObteniendo(true)
        try {
          const ubicacion = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          
          setCoords(ubicacion.coords);
          console.log('Ubicación obtenida:', ubicacion.coords.latitude, ubicacion.coords.longitude);

        } catch (error) {
          console.error('Error al obtener ubicación:', error);
          Alert.alert('Error', 'No se pudo obtener la ubicación');
        } finally {
          setObteniendo(false);
        }
    
  //Iniciar/detener seguiemiento en tiempo real
  const toggleSeguimiento = async () => {
    if (siguiendo) {
      // Detener seguimiento
      if (suscripcion) {
        suscripcion.remove();
        setSuscripcion(null);
      }
      setSiguiendo(false);
      Alert.alert('Seguimiento detenido');
    } else {
      // iniciar seguimiento
      const permiso = await solicitarPermiso();
      if (!permiso) return;
    
      try {
                const sub = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 3000,      // Cada 3 segundos
                        distanceInterval: 5,     // Cada 5 metros
                    },
                    (ubicacion) => {
                        setCoords(ubicacion.coords);
                        console.log('🎯 Ubicación actualizada:', ubicacion.coords.latitude, ubicacion.coords.longitude);
                    }
                );


                setSuscripcion(sub);
                setSiguiendo(true);
                Alert.alert('🎯 Seguimiento iniciado', 'La ubicación se actualizará automáticamente');


            } catch (error) {
                console.error('Error en seguimiento:', error);
                Alert.alert('Error', 'No se pudo iniciar el seguimiento');
            }
        }
    };


    /**
     * Limpia las coordenadas
     */
    /*const limpiarUbicacion = () => {
        setCoords(null);
        if (suscripcion) {
            suscripcion.remove();
            setSuscripcion(null);
        }
        setSiguiendo(false);
    };
    };*/
    
    


  /*const cargarDatos = async () => {
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
  }*/

  /*return (
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

      {/* Modal con el mapa */
      /*<Modal visible={mapVisible} animationType="slide">
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
}*/

import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function PerfilScreen() {
  // Estado para los datos del perfil guardados
  const [perfil, setPerfil] = useState(null);
  const [coords, setCoords] = useState(null);
  const [obteniendo, setObteniendo] = useState(false);
  const [siguiendo, setSiguiendo] = useState(false);
  const [suscripcion, setSuscripcion] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  // Cargar datos del perfil guardado en AsyncStorage
  // Cargar datos del perfil guardado en AsyncStorage cuando la pantalla esté en foco
useFocusEffect(
  useCallback(() => {
    const cargarPerfil = async () => {
      try {
        const perfilGuardado = await AsyncStorage.getItem("@perfil");
        if (perfilGuardado) {
          setPerfil(JSON.parse(perfilGuardado));
        } else {
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


  //Ubicacion
  const solicitarPermiso = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu ubicación');
      return false;
    }
    return true;
  };

  const obtenerUbicacion = async () => {
    const permiso = await solicitarPermiso();
    if (!permiso) return;

    setObteniendo(true);
    try {
      const ubicacion = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCoords(ubicacion.coords);
      console.log('Ubicación obtenida:', ubicacion.coords.latitude, ubicacion.coords.longitude);
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    } finally {
      setObteniendo(false);
    }
  };

  const toggleSeguimiento = async () => {
    if (siguiendo) {
      if (suscripcion) {
        suscripcion.remove();
        setSuscripcion(null);
      }
      setSiguiendo(false);
      Alert.alert('Seguimiento detenido');
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
            console.log('Ubicación actualizada:', ubicacion.coords.latitude, ubicacion.coords.longitude);
          }
        );

        setSuscripcion(sub);
        setSiguiendo(true);
        Alert.alert('Seguimiento iniciado', 'La ubicación se actualizará automáticamente');
      } catch (error) {
        console.error('Error en seguimiento:', error);
        Alert.alert('Error', 'No se pudo iniciar el seguimiento');
      }
    }
  };

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
        <Text style={styles.profileName}>{perfil.nombre} {perfil.apellido}</Text>
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
              <Text style={styles.statusText}>Actualizando en tiempo real...</Text>
            )}
          </>
        ) : (
          <Text style={styles.noLocationText}>
            {obteniendo ? 'Obteniendo ubicación...' : 'Sin ubicación'}
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
            {obteniendo ? 'Obteniendo...' : 'Obtener Ubicación'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, siguiendo ? styles.stopButton : styles.startButton]}
          onPress={toggleSeguimiento}
        >
          <Text style={styles.buttonText}>
            {siguiendo ? 'Detener Seguimiento' : 'Seguir Ubicación'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={limpiarUbicacion}
        >
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
                description={`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`}
              />
            </MapView>
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 40 }}>No hay ubicación para mostrar</Text>
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

//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0d1117',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#e6edf3',
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#fff',
  },
  profileAge: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
  coordsContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    marginBottom: 30,
    minWidth: '90%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coordsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#495057',
  },
  coordText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#6c757d',
    fontFamily: 'monospace',
  },
  statusText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
    marginTop: 10,
  },
  noLocationText: {
    fontSize: 16,
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '90%',
    gap: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
  },
  stopButton: {
    backgroundColor: '#dc3545',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  mapButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cerrarMapaBtn: {
    backgroundColor: '#dc3545',
    padding: 15,
    alignItems: 'center',
  },
  cerrarMapaTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
