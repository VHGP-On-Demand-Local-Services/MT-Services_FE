import React, { useState, useEffect } from 'react'
import { View, } from 'react-native'
import { Heading, Input, Button, Text } from 'native-base'

import DateTimePicker from '@react-native-community/datetimepicker';

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const [modeDate, setMode] = useState('datetime');
  const [modeTime, setModeTime] = useState('time')

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
    const seconds = date.getSeconds();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}, ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 20, paddingLeft: 14, paddingRight: 14, flex: 1 }}>
        <Heading size='md'>Tên dịch vụ: Tủ lạnh</Heading>
        <Heading size='sm' pt={4}>Hình thức dịch vụ: </Heading>
        <Input size='lg' mt={4} placeholder='Sửa chữa' isReadOnly={true} />
        <Heading size='sm' pt={4}>Số lượng: </Heading>
        <Input size='lg' mt={4} placeholder='1' isReadOnly={true} />
        <Heading size='sm' pt={4}>Tình trạng sản phẩm: </Heading>
        <Input size='lg' mt={4} placeholder='Mô tả về sản phẩm' />
        <Heading size='sm' pt={4}>Thời gian: </Heading>
        {/* <Input size='lg' mt={4} placeholder='Mô tả về sản phẩm' type='date' /> */}
        {/* <Heading size='sm'> {date.toLocaleString()}</Heading> */}

        <View style={{ flexDirection: 'row', paddingTop: 12 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={modeDate}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date()}
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
          <Heading style={{ alignSelf: 'flex-end' }} size='md'> 200.000đ</Heading>
        </View>
        <Button style={{ backgroundColor: '#6fc4f2', borderRadius: 15 }} mt={4} pt={4} pb={4} size='lg' >
          <Text fontSize={15} bold>Đặt lịch</Text>
        </Button>
      </View>
    </View>
  )
}

export default Booking