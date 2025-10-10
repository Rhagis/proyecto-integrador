import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import InicioScreen from '../Screens/InicioScreen.js'
import EditarPerfilScreen from '../Screens/EditarPerfirScreen.js'
import MisViajesScreen from '../Screens/MisviajesScreen.js'
import NuevoViajeScreen from '../Screens/NuevoViajeScreen.js'
import PerfilScreen from '../Screens/PerfilScreen.js'

const Tab = createBottomTabNavigator()

export default function TabsNavigator() {
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={InicioScreen}></Tab.Screen>
            <Tab.Screen name="Editar Perfil" component={EditarPerfilScreen}></Tab.Screen>
            <Tab.Screen name="Mis viajes" component={MisViajesScreen}></Tab.Screen>
            <Tab.Screen name="Nuevo viaje" component={NuevoViajeScreen}></Tab.Screen>
            <Tab.Screen name="Perfil" component={PerfilScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}
