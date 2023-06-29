import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { Heading, Select, CheckIcon } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooking, updateBookingStatus } from '../../Redux/features/BookingSlice'
import { useFocusEffect } from '@react-navigation/native'

const status = [
  { id: 1, name: 'Waiting' },
  { id: 2, name: 'Complete' },
  { id: 3, name: 'Cancel' }
]

const OderManagement = () => {
  const [selectedTab, setSelectedTab] = useState('Waiting');
  const dispatch = useDispatch()

  const { booking, error, loading } = useSelector(state => state.booking)

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getAllBooking())
    }, [dispatch])
  )

  const filteredBookings = booking && Array.isArray(booking) ? booking.filter(item => item.status === selectedTab) : [];


  const renderItem = ({ item }) => {
    const handleStatusChange = async (itemValue) => {
      await dispatch(updateBookingStatus({ id: item._id, data: { status: itemValue } }));
      dispatch(getAllBooking());
    };

    return (
      <View
        style={
          selectedTab && selectedTab === 'Waiting'
            ? styles.container_waiting
            : selectedTab && selectedTab === 'Complete'
              ? styles.container_complete
              : styles.container_cancel
        }
        key={item._id}
      >
        <View style={styles.header_order}>
          <Heading size='lg' style={selectedTab === 'Cancel' ? styles.name_service_cancel : styles.name_service}>
            {item.booking_item[0].service.name}
          </Heading>
        </View>
        <Heading size='sm' style={{ color: '#6fc4f2' }}>
          {item.totalPrice}đ
        </Heading>
        <Heading size='sm' style={selectedTab === 'Cancel' ? styles.dateBooking_cancel : styles.dateBooking}>
          Lịch hẹn: {new Date(item.dateBooking).toISOString().replace(/T/, ', ').replace(/\..+/, '')}
        </Heading>
        <Heading size='sm' style={{ color: '#3B4B72' }}>
          Điện thoại: {item.user.phone}
        </Heading>
        <View style={styles.header_order}>
          <Heading size='sm' style={{ color: '#3B4B72' }}>
            Căn hộ: {item.user.apartment}
          </Heading>
          <Select
            style={
              selectedTab && selectedTab === 'Waiting'
                ? styles.status_waiting_select
                : selectedTab && selectedTab === 'Complete'
                  ? styles.status_complete_select
                  : styles.status_cancel_select
            }
            selectedValue={item.status}
            minWidth="120"
            onValueChange={handleStatusChange}
          >
            {status.map((s) => {
              return (
                <Select.Item key={s.id} label={s.name} value={s.name} />
              )
            })}
          </Select>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tab_container}>
        <TouchableOpacity
          style={[styles.button, selectedTab === 'Waiting' && styles.activeButton]}
          onPress={() => handleTabPress('Waiting')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Waiting' && styles.activeButtonText]}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedTab === 'Complete' && styles.activeButton]}
          onPress={() => handleTabPress('Complete')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Complete' && styles.activeButtonText]}>
            Đã xác nhận
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedTab === 'Cancel' && styles.activeButton]}
          onPress={() => handleTabPress('Cancel')}
        >
          <Text style={[styles.buttonText, selectedTab === 'Cancel' && styles.activeButtonText]}>
            Từ chối
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container_waiting: {
    padding: 12,
    margin: 10,
    backgroundColor: '#f2ecaa',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  container_complete: {
    padding: 12,
    margin: 10,
    backgroundColor: '#b6f0bc',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  container_cancel: {
    padding: 12,
    margin: 10,
    backgroundColor: '#fa504b',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  header_order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab_container: {
    flexDirection: 'row',
    margin: 10,
  },
  name_service: {
    alignSelf: 'flex-start',
  },
  name_service_cancel: {
    alignSelf: 'flex-start',
    color: 'white',
  },
  status_waiting_select: {
    alignSelf: 'flex-end',
    color: '#f78d14',
    fontWeight: '500',
  },
  status_complete_select: {
    alignSelf: 'flex-end',
    color: '#056e1c',
    fontWeight: '500',
  },
  status_cancel_select: {
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: '500',
  },
  dateBooking: {
    color: '#3B4B72',
    marginTop: 5,
    marginBottom: 3,
  },
  dateBooking_cancel: {
    color: 'white',
    marginTop: 5,
    marginBottom: 3,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#b7ede6',
    margin: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  activeButton: {
    backgroundColor: '#0aad99',
  },
  activeButtonText: {
    color: 'white',
  },
  updateButton: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  updateButtonText: {
    color: '#0aad99',
    fontWeight: 'bold'
  }
});

export default OderManagement;
