import React from 'react'
// import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator()

const index = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='BottomTab' component={BottomTab} />
        </Stack.Navigator>
    )
}

export default index