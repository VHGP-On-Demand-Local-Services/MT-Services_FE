import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, ScrollView, Pressable, Icon } from "native-base";

import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getUserById, setError, updateUserById } from '../../Redux/features/UserSlice';
import { useNavigation } from '@react-navigation/native';



const EditUser = ({ route }) => {
    const { userId } = route.params

    const [name, setName] = useState('')
    const [phone, setPhone] = useState()
    const [apartment, setApartment] = useState('')
    const navigation = useNavigation()

    const { users, error, loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById({ id: userId }))
    }, [dispatch, userId])

    useEffect(() => {
        if (users) {
            setName(users.name);
            setPhone(users.phone ? users.phone.toString() : '');
            setApartment(users.apartment);
        }
    }, [users]);

    const handleSubmit = () => {
        const userData = { phone, name, apartment };
        dispatch(updateUserById({ id: userId, userData: userData }))
            .unwrap()
            .then(() => {
                alert('Edit Thành công !!');
                navigation.navigate('QL.Tài khoản');
                dispatch(getAllUsers({ page: 1, limit: 8 }));
                dispatch(setError(null))
            }).catch(e => {
                console.log(e);
            });
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <Center w='100%'>
                <Box safeArea p="1" w="90%" maxW="300">
                    <Heading size="xl" fontWeight="700" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Chỉnh sửa thông tin
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label isRequired>Điện thoại</FormControl.Label>
                            <Input size="md" type="text" value={phone} onChangeText={(text) => setPhone(text)} />
                            <FormControl.Label mt="5" isRequired>Tên</FormControl.Label>
                            <Input size="md" type='text' value={name} onChangeText={(text) => setName(text)} />
                            <FormControl.Label mt="5" isRequired>Căn hộ</FormControl.Label>
                            <Input size="md" type="text" value={apartment} onChangeText={(text) => setApartment(text)} />
                            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                                {error && <Text style={{ color: '#f7232d' }}>{error}</Text>}
                            </View>
                            <Button style={{ backgroundColor: '#6fc4f2' }} onPress={handleSubmit} disabled={loading}>
                                Submit
                            </Button>
                        </FormControl>
                    </VStack>
                </Box>
            </Center>
        </ScrollView>

    )
}

export default EditUser