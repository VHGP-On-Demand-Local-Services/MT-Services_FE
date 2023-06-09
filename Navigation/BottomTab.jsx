import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/User/Home'

import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from '../Screens/User/UserProfile'
import Order from '../Screens/User/Order';
import Register from '../Screens/Admin/Register';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator()

const BottomTab = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#6fc4f2',
            tabBarInactiveTintColor: '#ccc'
        }}>
            <Tab.Screen name="Trang chủ" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
            }} />
            <Tab.Screen name="Đơn hàng" component={Order} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Ionicons name="document" size={22} color={color} />
            }} />
            <Tab.Screen name="Tài khoản" component={UserProfile} options={{
                headerShown: false,
                tabBarIcon: ({ color }) => <Ionicons name="person" size={22} color={color} />
            }} />
            {user?.isAdmin === true ? (<>
                <Tab.Screen name="Đăng kí" component={Register} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="log-in" size={22} color={color} />
                }} />
            </>) : <></>}

        </Tab.Navigator>
    )
}

export default BottomTab
