
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, FormControl, Input } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { updateService, getAllService } from '../../Redux/features/ServiceSlice';
import useFormatCurrency from '../../hooks/useFormatCurrency';

const UpdateService = ({route}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [iconName, setIconName] = useState('');
    const [name, setName] = useState('');
    const [expectedPrice, setExpectedPrice] = useState('');
    const formatExpected = useFormatCurrency(expectedPrice);
    const [oldPrice, setOldPrice] = useState('');
    const formatOldExpected = useFormatCurrency(oldPrice);
    const { error } = useSelector(state => state.service);
    const { service } = route.params;

    useEffect(() => {
        setIconName(service.icon_name);
        setName(service.name);
        setOldPrice(service.expected_price.toString());
      }, [service]);

    const handleComplete = () => {
        dispatch(updateService({ id: service._id, serviceData: { icon_name: iconName, name, expected_price: expectedPrice} }))
            .unwrap()
            .then((response) => {
                alert('Cập nhật dịch vụ thành công');
                navigation.navigate('QL.Dịch vụ');
                dispatch(getAllService({ page: 1, limit: 6 }));
                dispatch(serviceSlice.actions.error(null));
            })
            .catch((error) => {
                console.log('Error', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Cập Nhật Dịch Vụ</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <FormControl style={styles.formControl}>
            <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Tên Dịch Vụ:</FormControl.Label>
                    {/* <Input
                        size="md"
                        value={service.name}
                        editable={false}
                    /> */}
                    <Text style={styles.text}>{service.name}</Text>
                </View>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Icon Dịch Vụ:</FormControl.Label>
                    {/* <Input
                        size="md"
                        value={service.icon_name}
                        editable={false}
                    /> */}
                    <Text style={styles.text}>{service.icon_name}</Text>
                </View>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Giá Dự Kiến Cũ:</FormControl.Label>
                    <Text style={styles.text}>{formatOldExpected}</Text>
                </View>
                <View style={styles.inputGroup}>
                    <FormControl.Label style={styles.label}>Giá Dự Kiến Mới:</FormControl.Label>
                    <Input
                        size="md"
                        placeholder="Nhập giá dự kiến mới..."
                        value={expectedPrice}
                        onChangeText={text => setExpectedPrice(text)}
                    />
                    <Text style={styles.text}>{formatExpected}</Text>
                </View>
                <Button onPress={handleComplete} mt={4} style={styles.button}>
                    Cập Nhật
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
    text:{
        marginLeft:15,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    label: {
        textDecorationLine: "underline",
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

export default UpdateService;