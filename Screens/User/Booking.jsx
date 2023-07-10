import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, View, } from 'react-native'
import { Heading, Input, Button, Text, Icon } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';
import { createBooking } from '../../Redux/features/BookingSlice';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const Booking = ({ route }) => {
  const { service } = route.params
  const navigation = useNavigation()

  const [status, setStatus] = useState('Sửa chữa')
  const [quantity, setQuantity] = useState('1')
  const [detailService, setDetailService] = useState('')
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(Number(service.expected_price))

  const [modeDate, setMode] = useState('datetime');

  const dispatch = useDispatch()
  const { booking, error, loading } = useSelector(state => state.booking)
  const { user } = useSelector(state => state.auth)

  const handleBooking = () => {
    const bookingData = { bookingItems: [{ quantity: quantity, service: service.id, status_duff: detailService }], user: user._id, dateBooking: formatDate(date) }
    dispatch(createBooking(bookingData)).unwrap().then((response) => {
      alert('Đặt dịch vụ thành công!');
      navigation.navigate('Trang chủ');
    })
      .catch((error) => {
        // console.log('Error', error);
        alert(error + ' Bạn phải đặt dịch vụ cách nhau 30p');
      });
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${year}-${formattedMonth}-${formattedDay}, ${formattedHours}:${formattedMinutes}`;
  };

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    setDate(currentDate);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 20, paddingLeft: 14, paddingRight: 14, flex: 1 }}>
        <Heading size='md'>Tên dịch vụ: {service.name}</Heading>
        <Heading size='sm' pt={4}>Hình thức dịch vụ: </Heading>
        <Input size='lg' mt={4} value={status} isReadOnly={true} />
        <Heading size='sm' pt={4}>Số lượng: </Heading>
        <Input size='lg' mt={4} value={quantity} isReadOnly={true} />
        <Heading size='sm' pt={4}>Tình trạng sản phẩm: </Heading>
        <Input size='lg' mt={4} placeholder='Mô tả về sản phẩm' value={detailService} onChangeText={(text) => setDetailService(text)} />
        <View style={{ flexDirection: 'row' }}>
          <Heading size='sm' pt={4}>Thời gian: </Heading>
          <TouchableOpacity style={{ paddingTop: 16 }} onPress={() => {
            alert('Thời gian được chọn tính từ ngày hôm nay + 1 ngày, và mỗi dịch vụ được đặt cách nhau 30p.')
          }}>
            <Feather name='info' size={19} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 12 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={modeDate}
            is24Hour={true}
            onChange={onChange}
            minimumDate={currentDate}
          />
        </View>
        <Input size='lg' mt={4} placeholder={formatDate(date)} isReadOnly={true} />

      </View>
      <View style={{
        borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#4d4343',
        paddingBottom: 40, paddingLeft: 14, paddingRight: 14, paddingTop: 15, backgroundColor: '#fff'
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Heading style={{ alignSelf: 'flex-start' }} size='md'> Tổng cộng: </Heading>
          <Heading style={{ alignSelf: 'flex-end' }} size='md'>{price.toLocaleString()} ₫</Heading>
        </View>
        <Button style={{ backgroundColor: '#6fc4f2', borderRadius: 15 }} mt={4} pt={4} pb={4} size='lg' onPress={handleBooking} >
          <Text fontSize={15} bold>Đặt lịch</Text>
        </Button>
      </View>
    </View>
  )
}

export default Booking