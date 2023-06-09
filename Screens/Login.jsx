import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import {  Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, ScrollView, Pressable, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
import { loginUser } from '../Redux/features/AuthSlice'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const { loading, error, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const handleLogin = () => {
        const userData = { phone, password }
        dispatch(loginUser(userData))
    }
    console.log(user);
    useEffect(() => {
        if (user != null) {
            navigation.replace('BottomTab')
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
                            Đăng Nhập
                        </Heading>
                        {/* <Heading mt="1" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="md">
                            Sign in to continue!
                        </Heading> */}
                        <View>
                            {error && <Text color='red'>{error}</Text>}
                        </View>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Phone</FormControl.Label>
                                <Input size="md" placeholder="Enter your phone..." type="number" value={phone} onChangeText={(text) => setPhone(text)} />
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    size="md"
                                    type={showPassword ? 'text' : 'password'}
                                    InputRightElement={<Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Icon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                    </Pressable>}
                                    placeholder="Enter your password..."
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <Link _text={{
                                    fontSize: "sm",
                                    fontWeight: "500",
                                    color: "indigo.500"
                                }} alignSelf="flex-end" mt="1">
                                    Forget Password?
                                </Link>
                                <Button style={{backgroundColor: '#6fc4f2'}} onPress={handleLogin} disabled={loading}>
                                    Đăng nhập
                                </Button>

                            </FormControl>

                            {/* <HStack mt="6" justifyContent="center">
                                <Text fontSize="md" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    Don't have account.{" "}
                                </Text>
                                <Link _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "md"
                                }} onPress={() => navigation.navigate('User')}>
                                    Sign Up
                                </Link>
                            </HStack> */}
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </>
    )
}

export default Login