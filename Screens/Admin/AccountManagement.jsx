import { SafeAreaView, View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AccountManagement = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <Text>AccountManagement</Text>
            <Button title=' Đăng kí tài khoản' onPress={()=> navigation.navigate('Register')}/>
               
                
        </SafeAreaView>
    )
}

export default AccountManagement