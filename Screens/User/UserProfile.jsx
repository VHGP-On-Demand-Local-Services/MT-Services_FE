import { SafeAreaView, View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logoutUser } from '../../Redux/features/AuthSlice'

const UserProfile = () => {
    const { loading, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogut = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        if ( user == null) {
            navigation.replace('Login')
        }
    }, [user])

    return (
        <SafeAreaView>
            <Text>UserProfile</Text>
            <Text>{user?.name}</Text>
            <Button title='Logout' onPress={handleLogut} disabled={loading} />
        </SafeAreaView>
    )
}

export default UserProfile