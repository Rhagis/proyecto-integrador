import {View, Text, StyleSheet, Button} from 'react-native'
import { useAuth } from '../auth/useAuth'
import * as SecureStore from 'expo-secure-store'

export default function InicioScreen(){

    const {setIsAuthenticated} = useAuth()

    const logout = async () => {
        await SecureStore.deleteItemAsync('userToken')
        setIsAuthenticated(false)
    }
    return (
        <View>
            <Text>Bienvenido a la Pagina de Inicio</Text>
            <Button title="Logout" onPress={logout}></Button>
        </View>
    )
}