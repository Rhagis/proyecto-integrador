import {createContext, useState, useEffect, Children} from 'react'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthentitated] = useState(false)
    const {loading, setLoading} = useState(true)

    useEffect(()=>{
        const checkToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('userToken')
                setIsAuthentitated(!!token)
            } catch (error) {
                setIsAuthentitated(false)
            }
            finally{
                setLoading(false)
            }
        }
        checkToken()
    },[])


    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthentitated,loading}}>
            {children}
        </AuthContext.Provider>
    )
}