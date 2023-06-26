import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, FormControl, Input, Button, Center, Pressable, Icon, Link, HStack, Text, ScrollView, View } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/features/AuthSlice';
import { getAllUsers } from '../../Redux/features/UserSlice';

const Register = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [showPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [apartment, setApartment] = useState('')
    const [password, setPassword] = useState('')

    const { isSignUp, user, error } = useSelector(state => state.auth)


    const handleRegister = () => {
        const userData = { phone, name, apartment, password }
        dispatch(registerUser(userData))
            .unwrap()
            .then(() => {
                alert('Đăng kí thành công !!')
                dispatch(getAllUsers({ page: 1, limit: 8 }))
                navigation.navigate('QL.Tài khoản')
                dispatch(authSlice.actions.error(null));
            }).catch(e => {
                console.log('Error: ', e);
            })
    }

    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <Center w='100%'>
                    <Box safeArea p="1" py="10" w="90%" maxW="300">
                        <Heading size="2xl" fontWeight="700" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Đăng Kí
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>

                                <FormControl.Label isRequired={true}>Số Điện Thoại</FormControl.Label>
                                <Input
                                    size="md"
                                    type="text"
                                    placeholder='Nhập Số Điện Thoại...'
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)} />

                                <FormControl.Label isRequired={true}>Mật Khẩu</FormControl.Label>
                                <Input
                                    size="md"
                                    type={showPassword ? 'text' : 'password'}
                                    InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                    </Pressable>}
                                    placeholder='Nhập Mật Khẩu...'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />

                                <FormControl.Label isRequired={true}>Tên Người Thuê</FormControl.Label>
                                <Input
                                    size="md"
                                    type="text"
                                    placeholder='Nhập Tên Người Thuê...'
                                    value={name}
                                    onChangeText={(text) => setName(text)} />

                                <FormControl.Label isRequired={true}>Căn Hộ</FormControl.Label>
                                <Input
                                    size="md"
                                    type='text'
                                    placeholder='Nhập Tên Căn Hộ...'
                                    value={apartment}
                                    onChangeText={(text) => setApartment(text)} />

                                {error && <View style={{ paddingTop: 10 }}><Text style={{ color: 'red' }}>{error}</Text></View>}

                                <Button onPress={handleRegister} mt="2" style={{ backgroundColor: '#6fc4f2' }}>
                                    Đăng kí
                                </Button>
                            </FormControl>
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </>
    )
}

export default Register