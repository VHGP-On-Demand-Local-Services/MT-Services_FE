import { SafeAreaView, View, Text, Button, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserById, getAllUsers, getUserById } from '../../Redux/features/UserSlice'
import { Heading } from 'native-base'

import { Ionicons } from '@expo/vector-icons';

import Modal from 'react-native-modal'

const AccountManagement = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(8)

    const navigation = useNavigation()
    const { loading, error, users } = useSelector(state => state.user.users)
    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState('')

    const toggleModal = (id) => {
        setSelectedUserId(id)
        setIsModalVisible(!isModalVisible)
    }

    useEffect(() => {
        dispatch(getAllUsers({ page: page, limit: limit }))
    }, [dispatch, page])

    const navigateToNextPage = () => {
        setPage(page + 1)
    }

    const navigateToPreviousPage = () => {
        setPage(page - 1)
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
                        dispatch(deleteUserById({ id: selectedUserId }))
                        setIsModalVisible(false)
                        dispatch(getAllUsers({ page: page, limit: limit }))
                    }
                }
            ]
        )
    }

    const handleEditUser = () => {
        navigation.navigate('Chỉnh sửa thông tin', { userId: selectedUserId })
        setIsModalVisible(false)
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
            {loading ? (
                <ActivityIndicator size='large' color='#000' />
            ) : users && users.length > 0 ? (
                <>
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        styles={styles.flatList}
                    />
                    <View style={styles.pagination}>
                        {page > 1 &&
                            <TouchableOpacity style={styles.paginationButton} onPress={navigateToPreviousPage}>
                                <Ionicons name='chevron-back' style={styles.paginationButtonIcon} />
                            </TouchableOpacity>
                        }
                        {users.length === limit && (
                            <TouchableOpacity style={styles.paginationButton} onPress={navigateToNextPage}>
                                <Ionicons name='chevron-forward' style={styles.paginationButtonIcon} />
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            ) : (
                <View>
                    <Text>Không có User</Text>
                    {page > 1 && (
                        <Button title='Trước' style={styles.paginationButton} onPress={navigateToPreviousPage} />
                    )}
                </View>
            )}

            <View style={styles.container}>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Register')}>
                    <Ionicons name='add' style={styles.addButtonIcon} />
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Edit or Delete?</Text>

                    <TouchableOpacity style={styles.modalButtonEdit} onPress={handleEditUser}>
                        <Text style={styles.modalButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButton} onPress={handleDeleteUser}>
                        <Text style={styles.modalButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        right: 30,
    },
    addButton: {
        backgroundColor: '#6fc4f2',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonIcon: {
        color: 'white',
        fontSize: 30,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
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
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    paginationButton: {
        backgroundColor: '#6fc4f2',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    paginationButtonIcon: {
        color: 'white',
        fontSize: 20,
    },
    addButtonContainer: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#6fc4f2',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        right: 30,
    },
    addButtonIcon: {
        color: 'white',
        fontSize: 30,
    },
    userItemContainer: {
        flex: 1,
        paddingTop: 2,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    userInfo: {
        flex: 1,
        marginHorizontal: 5,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
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
});

export default AccountManagement;
