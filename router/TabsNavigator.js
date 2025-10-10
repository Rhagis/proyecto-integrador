import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import InicioScreen from '../Screens/InicioScreen'
import EditarPerfilScreen from '../Screens/EditarPerfirScreen'
import MisViajesScreen from '../Screens/MisviajesScreen'
import NuevoViajeScreen from '../Screens/NuevoViajeScreen'
import PerfilScreen from '../Screens/PerfilScreen'

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
