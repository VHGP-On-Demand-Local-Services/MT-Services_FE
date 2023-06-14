import React from 'react'
// import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import BottomTab from './BottomTab';
import Register from '../Screens/Admin/Register';
import EditUser from '../Screens/Admin/EditUser';
import InfoUser from '../Screens/User/InfoUser';
import Booking from '../Screens/User/Booking';
import ChangePass from '../Screens/User/ChangePass';

const Stack = createNativeStackNavigator()

const index = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='BottomTab' component={BottomTab} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: true }} />
            <Stack.Screen name='Chỉnh sửa thông tin' component={EditUser} options={{ headerShown: true }} />
            <Stack.Screen name='Thông tin cá nhân' component={InfoUser} options={{ headerShown: true }} />
            <Stack.Screen name='Đặt lịch' component={Booking} options={{ headerShown: true }} />
            <Stack.Screen name='Đổi mật khẩu' component={ChangePass} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}

export default index