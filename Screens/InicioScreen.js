/*import {View, Text, StyleSheet, Button} from 'react-native'
import { useAuth } from '../auth/useAuth'
import * as SecureStore from 'expo-secure-store'

export default function InicioScreen(){

    const {setIsAuthenticated} = useAuth()

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken')
        setIsAuthenticated(false)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la Pagina de Inicio</Text>
            <Button title="Logout" onPress={logout}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#0d1117', 
    },
    
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 40,
        color: '#e6edf3', 
        letterSpacing: 1,
    },

    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#238636',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 16,
    },

    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },

    registerButton: {
        backgroundColor: '#1f6feb',
    },
});*/

/*import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../auth/useAuth';
import * as SecureStore from 'expo-secure-store';

export default function InicioScreen({ navigation }) {
  const { setIsAuthenticated } = useAuth();

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Página de Inicio</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.buttonText}>Ver Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Editar Perfil')}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Mis viajes')}
      >
        <Text style={styles.buttonText}>Mis Viajes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Nuevo viaje')}
      >
        <Text style={styles.buttonText}>Nuevo Viaje</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0d1117',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 30,
    color: '#e6edf3',
    letterSpacing: 1,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#238636',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#d73a49',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});*/

import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/useAuth';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InicioScreen({ navigation }) {
  const { setIsAuthenticated } = useAuth();
  const [nombre, setNombre] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar perfil del usuario logueado
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const userId = await SecureStore.getItemAsync('userToken');
        if (userId) {
          const perfilGuardado = await AsyncStorage.getItem(`@perfil_${userId}`);
          if (perfilGuardado) {
            const perfil = JSON.parse(perfilGuardado);
            setNombre(perfil.nombre || '');
          }
        }
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido{nombre ? `, ${nombre}` : ''}!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.buttonText}>👤 Ver Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Editar Perfil')}
      >
        <Text style={styles.buttonText}>✏️ Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Mis viajes')}
      >
        <Text style={styles.buttonText}>🧳 Mis Viajes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Nuevo viaje')}
      >
        <Text style={styles.buttonText}>➕ Nuevo Viaje</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
        <Text style={styles.buttonText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos (igual que antes)
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#0d1117' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 30, color: '#e6edf3', letterSpacing: 1 },
  button: { width: '80%', height: 50, backgroundColor: '#238636', justifyContent: 'center', alignItems: 'center', borderRadius: 12, marginVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  logoutButton: { backgroundColor: '#d73a49', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold', letterSpacing: 0.5 },
});

