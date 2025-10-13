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
});