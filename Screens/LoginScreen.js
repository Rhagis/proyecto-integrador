import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';
import { useAuth } from '../auth/useAuth';

export default function LoginScreen({ navigation}){
    const { setIsAuthenticated } = useAuth()
    const [usuario, setUsuario] = useState('')
    const [contraseña, setContraseña] = useState('')

    const logear = async () =>{
        if(usuario && contraseña){
            try {
                const credenciales = await signInWithEmailAndPassword(auth,usuario,contraseña)
                const userId = credenciales.user.uid
                await SecureStore.setItemAsync('userToken', userId)
                setIsAuthenticated(!!userId)
            } catch (error) {
                console.error('Error al intentar logear', error.message)
                alert('Fallo al logear')
            }
        }
    }

    const registrar = async () => {
        if (usuario && contraseña){
            try {
                const credenciales = await createUserWithEmailAndPassword(auth,usuario,contraseña)
                const userId = credenciales.user.uid
                setIsAuthenticated(!!userId)
                setTimeout(()=> navigation.navigate('Tabs'),100)
                navigation.navigate('Tabs')
            } catch (error) {
              console.error('Error al registrar usuario', error.message)
              alert('Registro Fallido')  
            }
        }
    }

    return (
        <View>
            <Text></Text>
            <TextInput placeholder='Email' value={usuario} onChangeText={setUsuario} keyboardType='email-address' autoCapitalize='none'></TextInput>
            <TextInput placeholder='Contraseña' value={contraseña} onChangeText={setContraseña} secureTextEntry></TextInput>
            <TouchableOpacity onPress={logear}>
                <Text>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={registrar}>
                <Text>Registrar Usuario</Text>
            </TouchableOpacity>
        </View>
    )
}