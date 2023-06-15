import React, { useState } from 'react';
import { VStack, Input, Button, FormControl, Alert, Pressable, Icon } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, selectChangePasswordStatus } from '../../Redux/features/UserSlice';
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';
import { logoutUser } from '../../Redux/features/AuthSlice';

const UserChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const changePasswordStatus = useSelector(selectChangePasswordStatus);
    
    const { user } = useSelector(state => state.auth)

    const handleSubmit = () => {

        // Dispatch the changePassword action
        dispatch(changePassword({ id: user._id, passwordData: { oldPassword, newPassword, confirmPassword } }));


        // Reset the form
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    if(changePasswordStatus === 'success'){
        setTimeout(() => {
            dispatch(logoutUser());
          }, 1000);
    }

    return (
        
        <VStack space={4} maxWidth="400px" marginX="auto">
            {changePasswordStatus === 'success' && (
                <Alert status="success">
                    Password changed successfully.
                </Alert>
                
            )}
            {changePasswordStatus === 'error' && (
                <Alert status="error">
                    Failed to change password.
                </Alert>
            )}

            <FormControl isRequired style={{width:200}}>
                <FormControl.Label>Current Password</FormControl.Label>
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
                    placeholder="Enter your current password..."
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                />
            </FormControl>

            <FormControl isRequired style={{width:200}}>
                <FormControl.Label>New Password</FormControl.Label>
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
                    placeholder="Enter your new password..."
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                />
            </FormControl>

            <FormControl isRequired style={{width:200}}>
                <FormControl.Label>Confirm Password</FormControl.Label>
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
                    placeholder="Confirm your new password..."
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </FormControl>

            <Button onPress={handleSubmit}>Change Password</Button>
        </VStack>
    );
};

export default UserChangePassword;
