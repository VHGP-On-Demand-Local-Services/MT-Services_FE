import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, Button, Pressable, StyleSheet } from 'react-native'
import { Box, Avatar } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logoutUser } from '../../Redux/features/AuthSlice'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const UserProfile = () => {
    const { loading, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogut = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        if (user == null) {
            navigation.replace('Login')
        }
    }, [user])


    return (
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center', backgroundColor: "#6fc4f2", padding: 30, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, shadowRadius: 200 }}>
                <Avatar bg="green.500" size='lg' source={{
                    uri: "https://i.pinimg.com/originals/dd/ff/4f/ddff4f09ae9f72cd973e24ea93a358f3.jpg"
                }}>
                    🛠️
                </Avatar>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontWeight: '600', fontSize: 26, paddingBottom: 5 }}>{user?.name} </Text>
                    {/* <Text style={{ fontWeight: '400', fontSize: 18, paddingBottom: 5 }}>{user?.phone} </Text> */}
                    <Text style={{ fontWeight: '400', fontSize: 18, paddingBottom: 5 }}>{user?.apartment} </Text>
                    {/* <Pressable onPress={() => { navigation.navigate('Đổi mật khẩu') }}>
                        <Text style={{ fontWeight: '600',fontSize: 14, color: '#3b3a38' }}>Đổi mật khẩu</Text>
                    </Pressable> */}
                </View>
            </View>
            <Pressable style={styles.btn} onPress={() => { navigation.navigate('Thông tin cá nhân') }} >
                <Ionicons name='person-outline' size={30} paddingLeft={15} paddingRight={20} />
                <Button color='#080A12' title='Thông tin cá nhân' onPress={() => { navigation.navigate('Thông tin cá nhân') }} />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => { }} >
                <Ionicons name='settings-outline' size={30} paddingLeft={15} paddingRight={20} />
                <Button color='#080A12' title='Cài đặt tài khoản' />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => { }}>
                <Ionicons name='help-circle-outline' size={30} paddingLeft={15} paddingRight={20} />
                <Button color='#080A12' title='Trợ giúp' />
            </Pressable>
            <Pressable style={styles.btn} onPress={() => { navigation.navigate('Đổi mật khẩu') }}>
                <Ionicons name='key-outline' size={30} paddingLeft={15} paddingRight={20} />
                <Button color='#080A12' title='Đổi mật khẩu' onPress={() => { navigation.navigate('Đổi mật khẩu') }} />

            </Pressable>
            <Pressable style={styles.btn} onPress={handleLogut}>
                <Ionicons name='log-out-outline' size={30} paddingLeft={15} paddingRight={20} />
                <Button color='#080A12' title='Đăng xuất' disabled={loading} onPress={handleLogut} />
            </Pressable>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    btn: {
        marginLeft: 5,
        marginRight: 5,
        padding: 8,
        alignContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EDF1F7'
    }
})

export default UserProfile