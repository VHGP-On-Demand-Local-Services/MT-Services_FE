import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VStack, Input, Button, FormControl, Alert, Pressable, Icon, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../Redux/features/UserSlice';
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { logoutUser, setError } from '../../Redux/features/AuthSlice';

const UserChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { error } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)

    const handleSubmit = () => {

        // Dispatch the changePassword action
        dispatch(changePassword({ id: user._id, passwordData: { oldPassword, newPassword, confirmPassword } }))
            .unwrap()
            .then((response) => {
                alert('Cập nhật mật khẩu thành công, vui lòng đăng nhập lại!');
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                dispatch(logoutUser());
                dispatch(setError(null))
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    return (

        <View style={styles.container}>
            <Text style={styles.heading}>Đổi Mật Khẩu</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <FormControl isRequired style={styles.inputGroup}>
                <FormControl.Label style={styles.label}>Mật khẩu hiện tại</FormControl.Label>
                <Input
                    type={showOldPassword ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
                            <Icon
                                as={MaterialIcons}
                                name={showOldPassword ? 'visibility' : 'visibility-off'}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        </Pressable>
                    }
                    placeholder="Điền lại mật khẩu hiện tại..."
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                />
            </FormControl>

            <FormControl isRequired style={styles.inputGroup}>
                <FormControl.Label style={styles.label}>Mật khẩu mới</FormControl.Label>
                <Input
                    type={showNewPassword ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                            <Icon
                                as={MaterialIcons}
                                name={showNewPassword ? 'visibility' : 'visibility-off'}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        </Pressable>
                    }
                    placeholder="Mật khẩu mới..."
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
            </FormControl>

            <FormControl isRequired style={styles.inputGroup}>
                <FormControl.Label style={styles.label}>Xác nhận lại mật khẩu</FormControl.Label>
                <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    InputRightElement={
                        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Icon
                                as={MaterialIcons}
                                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                                size={5}
                                mr="2"
                                color="muted.400"
                            />
                        </Pressable>
                    }
                    placeholder="Xác nhập mật khẩu..."
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </FormControl>
            <Button onPress={handleSubmit} mt={4} style={styles.button}>Xác nhận</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        paddingTop: 5
    },
    formControl: {
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#6fc4f2',
        marginTop: 24,
        borderRadius: 8,
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
});

export default UserChangePassword;
