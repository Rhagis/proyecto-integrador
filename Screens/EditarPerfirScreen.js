/*export default function EditarPerfilScreen(){
    return 'hola'
}*/

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function EditarPerfilScreen({ navigation }) {
  const [perfil, setPerfil] = useState({
    nombre: "",
    edad: "",
    foto: null,
  });
  const [loading, setLoading] = useState(true);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    cargarPerfil();
  }, []);

  // Cargar datos guardados del perfil
  const cargarPerfil = async () => {
    try {
      const data = await AsyncStorage.getItem("@perfil");
      if (data) setPerfil(JSON.parse(data));
    } catch (error) {
      console.error("Error al cargar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar datos del perfil
  const guardarPerfil = async () => {
    try {
      await AsyncStorage.setItem("@perfil", JSON.stringify(perfil));
      alert("Perfil guardado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar perfil:", error);
    }
  };

  // Tomar foto con la cámara
  const tomarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      setPerfil({ ...perfil, foto: foto.uri });
      setCameraVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  // Vista de cámara
  if (cameraVisible) {
    if (!permission) return <View />;
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={{ color: "#fff", marginBottom: 10 }}>
            Se necesita permiso para usar la cámara
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Dar permiso</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} ref={cameraRef} facing="front" />
        <TouchableOpacity style={styles.mapButton} onPress={tomarFoto}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cerrarMapaBtn}
          onPress={() => setCameraVisible(false)}
        >
          <Text style={styles.cerrarMapaTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Vista principal de edición
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Perfil</Text>

      <View style={styles.profileContainer}>
        {perfil.foto ? (
          <Image source={{ uri: perfil.foto }} style={styles.profileImage} />
        ) : (
          <View style={[styles.profileImage, styles.fotoVacia]}>
            <Text style={{ color: "#888" }}>Sin foto</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => setCameraVisible(true)}
        >
          <Text style={styles.buttonText}>Tomar nueva foto</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={perfil.nombre}
        onChangeText={(text) => setPerfil({ ...perfil, nombre: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        placeholderTextColor="#999"
        value={perfil.apellido}
        onChangeText={(text) => setPerfil({ ...perfil, apellido: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={perfil.edad}
        onChangeText={(text) => setPerfil({ ...perfil, edad: text })}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.startButton} onPress={guardarPerfil}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>↩ Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ✅ Tus estilos originales
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
  input: {
    width: "90%",
    backgroundColor: "#161b22",
    color: "#e6edf3",
    borderWidth: 1,
    borderColor: "#30363d",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonsContainer: {
    width: "90%",
    gap: 12,
  },
  startButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
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
