
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { createService, getAllService } from '../../Redux/features/ServiceSlice';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import { setError } from '../../Redux/features/ServiceSlice';
const CreateService = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [iconName, setIconName] = useState('');
    const [name, setName] = useState('');
    const [expectedPrice, setExpectedPrice] = useState('');
    const formatExpected = useFormatCurrency(expectedPrice)
    const { error } = useSelector(state => state.service);

    const handleComplete = () => {
        const serviceData = { icon_name: iconName, name, expected_price: expectedPrice };
        dispatch(createService(serviceData))
            .unwrap()
            .then((response) => {
                alert('Thêm dịch vụ thành công!');
                navigation.navigate('QL.Dịch vụ');
                dispatch(getAllService({ page: 1, limit: 6 }));
                dispatch(setError(null));
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Thêm Dịch Vụ</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <FormControl style={styles.formControl}>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Icon Dịch Vụ:</FormControl.Label>
                    <Input
                        size="md"
                        placeholder="Nhập Icon..."
                        value={iconName}
                        onChangeText={text => setIconName(text.toLowerCase())}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Tên Dịch Vụ:</FormControl.Label>
                    <Input
                        size="md"
                        placeholder="Nhập tên dịch vụ..."
                        value={name}
                        onChangeText={text => {
                            const words = text.split(' ');
                            const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                            const capitalizedText = capitalizedWords.join(' ');
                            setName(capitalizedText);
                        }}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Giá Dự Kiến:</FormControl.Label>
                    <Input
                        size="md"
                        placeholder="Nhập giá dự kiến..."
                        value={expectedPrice}
                        onChangeText={text => setExpectedPrice(text)}
                    />
                    <Text>{formatExpected}</Text>
                </View>
                <Button onPress={handleComplete} mt={4} style={styles.button}>
                    Hoàn Thành
                </Button>
            </FormControl>
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

export default CreateService;