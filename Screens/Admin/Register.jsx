import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, FormControl, Input, Button, Center, Pressable, Icon, Link, HStack, Text, ScrollView } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/features/AuthSlice';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [apartment, setApartment] = useState('')
    const [password, setPassword] = useState('')

    const { user, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleRegister = () => {
        const userData = { phone, name, apartment, password }
        dispatch(registerUser(userData))
    }

    useEffect(() => {
        if (user != null) {
            alert('Đăng kí thành công!!')
            navigation.navigate('Tài khoản')
        }
    }, [user])

    return (
        <>
            <ScrollView style={{ flex: 1 }}>
                <Center w='100%'>
                    <Box safeArea p="1" py="40" w="90%" maxW="300">
                        <Heading size="2xl" fontWeight="700" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Đăng Kí
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>

                                <FormControl.Label>Phone</FormControl.Label>
                                <Input size="md" type="text" placeholder='Enter your phone...' value={phone} onChangeText={(text) => setPhone(text)} />

                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="md"
                                    type={showPassword ? 'text' : 'password'}
                                    InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                    </Pressable>}
                                    placeholder='Enter your password...'
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />

                                <FormControl.Label>Name</FormControl.Label>
                                <Input size="md" type="text" placeholder='Enter your name...' value={name} onChangeText={(text) => setName(text)} />

                                <FormControl.Label>Apartment </FormControl.Label>
                                <Input size="md" type='text' placeholder='Enter your apartment...' value={apartment} onChangeText={(text) => setApartment(text)} />

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