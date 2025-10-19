import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated,} from "react-native";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../config/Firebase";
import { useAuth } from "../auth/useAuth";

export default function LoginScreen({ navigation }) {
  const { setIsAuthenticated } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Función para manejar el inicio de sesión
  const logear = async () => {
    if (usuario && contraseña) {
      try {
        const credenciales = await signInWithEmailAndPassword(
          auth,
          usuario,
          contraseña
        );
        const userId = credenciales.user.uid;
        await SecureStore.setItemAsync("userToken", userId);
        setIsAuthenticated(!!userId);
      } catch (error) {
        console.error("Error al intentar logear", error.message);
        alert("Fallo al logear");
      }
    }
  };

  // Función para manejar el registro de nuevos usuarios
  const registrar = async () => {
    if (usuario && contraseña) {
      try {
        const credenciales = await createUserWithEmailAndPassword(
          auth,
          usuario,
          contraseña
        );
        const userId = credenciales.user.uid;
        setIsAuthenticated(!!userId);
        setTimeout(() => navigation.navigate("Tabs"), 100);
        navigation.navigate("Tabs");
      } catch (error) {
        console.error("Error al registrar usuario", error.message);
        alert("Registro Fallido");
      }
    }
  };

  // Animación para el borde de los campos de entrada
  const borderAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1f6feb", "#238636"],
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil viajero</Text>
      <Text style={styles.title}>Login/Registro</Text>

      <View style={styles.inputContainer}>
        <Animated.View style={[styles.animatedBorder, { borderColor }]} />
        <TextInput
          placeholder="Email"
          value={usuario}
          onChangeText={setUsuario}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#888"
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Animated.View style={[styles.animatedBorder, { borderColor }]} />
        <TextInput
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        ></TextInput>
      </View>

      <TouchableOpacity onPress={logear} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar Sesion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={registrar}
        style={[styles.button, styles.registerButton]}
      >
        <Text style={styles.buttonText}>Registrar Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

//Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#0d1117",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 40,
    color: "#e6edf3",
    letterSpacing: 1,
  },

  inputContainer: {
    width: "90%",
    marginBottom: 20,
    position: "relative",
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#161b22",
    color: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  animatedBorder: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
    borderWidth: 3,
  },

  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#238636",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  registerButton: {
    backgroundColor: "#1f6feb",
  },
});
