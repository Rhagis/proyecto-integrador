import TabsNavigator from "./TabsNavigator";
import LoginScreen from '../Screens/LoginScreen'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useAuth} from '../auth/useAuth'
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export function AppNavigator(){
    const {isAuthenticated} = useAuth()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <Stack.Screen name="Pestañas" component={TabsNavigator} options={{headerShown:false}}/>
                ):(
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}