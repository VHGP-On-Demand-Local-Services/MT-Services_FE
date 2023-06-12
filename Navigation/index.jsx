import React from 'react'
// import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import BottomTab from './BottomTab';
import Register from '../Screens/Admin/Register';
import EditUser from '../Screens/Admin/EditUser';

const Stack = createNativeStackNavigator()

const index = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='BottomTab' component={BottomTab} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: true }} />
            <Stack.Screen name='Edit User' component={EditUser} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default index