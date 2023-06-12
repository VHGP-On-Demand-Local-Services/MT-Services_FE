import { SafeAreaView, View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserById, getAllUsers, getUserById } from '../../Redux/features/UserSlice'
import { Heading } from 'native-base'

import { Ionicons, } from '@expo/vector-icons';

import Modal from 'react-native-modal'

const AccountManagement = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const navigation = useNavigation()
    const { loading, error, users } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [isModalVisible, setIsMoadlVisible] = useState(false)
    const [selectedAccountId, setSelectedAccountId] = useState('')

    const toggleModal = (id) => {
        setSelectedAccountId(id)
        setIsMoadlVisible(!isModalVisible)
    }

    useEffect(() => {
        dispatch(getAllUsers({ page: page, limit: limit }))
    }, [dispatch, page, limit])

    const navigateToNextPage = () => {
        setPage(page + 1)
    }

    const navigateToPreviousPage = () => {
        if (page) {
            setPage(page - 1)
        }
    }

    const handleDeleteUser = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa người dùng này không?',
            [
                {
                    text: 'Hủy bỏ',
                    style: 'cancel'
                },
                {
                    text: 'Xoá',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteUserById({ id: selectedAccountId }))
                        setIsMoadlVisible(false)
                        dispatch(getAllUsers({ page: page, limit: limit }))
                    }
                }
            ]
        )
    }

    const handleEditUser = () => {
        navigation.navigate('Edit User', { userId: selectedAccountId })
        setIsMoadlVisible(false)
    }

    const renderItem = ({ item }) => {
        return (
            <View key={item._id} style={{ flex: 1, paddingTop: 2 }} >
                <TouchableOpacity
                    style={styles.userItem}
                    onPress={() => toggleModal(item._id)}
                    onLongPress={() => toggleModal(item._id)}
                    key={item._id}
                >
                    <Text>{item.phone}</Text>
                    <Text>{item.name}</Text>
                    <Text>{item.apartment}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <Heading style={{ textAlign: 'center', paddingBottom: 20 }}>Danh sách User</Heading>
            <FlatList
                data={users.users}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                styles={styles.flatList}
            />

            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsMoadlVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit or Delete?</Text>

                    <TouchableOpacity style={styles.modalButtonEdit} onPress={handleEditUser}>
                        <Text style={styles.modalButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButton} onPress={handleDeleteUser}>
                        <Text style={styles.modalButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Modal >

            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    <Button title='Trước' onPress={navigateToPreviousPage} disabled={page == 1} />
                    <Button title='Sau' onPress={navigateToNextPage} />
                </View>

                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')} >
                        <Ionicons name='add' style={styles.buttonText} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 30,
    },
    button: {
        backgroundColor: '#6fc4f2',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        alignItems: 'center',
    },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    flatList: {
        paddingTop: 20
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignContent: 'center'

    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: 'center'
    },
    modalButton: {
        backgroundColor: "#e74c3c",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonEdit: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        color: "#fff",
        textAlign: "center",
    },
})

export default AccountManagement