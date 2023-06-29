import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Heading } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBookingById, getBookingByUserId } from '../../Redux/features/BookingSlice'
import { useFocusEffect } from '@react-navigation/native'

const Order = () => {
  const [selectedTab, setSelectedTab] = useState('Waiting');
  // const [seletedBookingId, setSelectedBookingId] = useState('')

  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { booking, error, loading } = useSelector(state => state.booking)

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getBookingByUserId({ userId: user._id }))
    }, [dispatch, user])
  )

  const filteredBookings = booking && Array.isArray(booking) ? booking.filter(item => item.status === selectedTab) : [];

  const handleDeleteBooking = ({ id }) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn hủy đơn hàng này không?',
      [
        {
          text: 'Hủy bỏ',
          style: 'cancel'
        },
        {
          text: 'Hủy',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteBookingById({ id: id }))
            dispatch(getBookingByUserId({ userId: user._id }))
          }
        }
      ]
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          {filteredBookings && filteredBookings.map(item => (
            <View key={item._id} style={
              selectedTab && selectedTab === 'Waiting'
                ?
                styles.container_waiting
                : selectedTab && selectedTab === 'Complete'
                  ? styles.container_complete
                  : styles.container_cancel
            } >
              <View style={styles.header_order} key={item.booking_item._id}>
                <Heading size='lg' style={selectedTab === 'Cancel' ? styles.name_service_cancel : styles.name_service}>{item.booking_item[0].service.name}</Heading>
                {selectedTab === 'Complete' || selectedTab === 'Cancel' ? '' : (
                  <TouchableOpacity onPress={() => handleDeleteBooking(item)}>
                    <Text style={{ alignSelf: 'flex-end', color: 'red' }} >Hủy</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Heading size='sm' style={{ color: '#6fc4f2' }}>{item.totalPrice}đ</Heading>
              <Heading size='sm' style={selectedTab === 'Cancel' ? styles.dateBooking_cancel : styles.dateBooking}>Lịch hẹn: {new Date(item.dateBooking).toISOString().replace(/T/, ', ').replace(/\..+/, '')}</Heading>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
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
    margin: 10
  },
  name_service: {
    alignSelf: 'flex-start'
  },
  name_service_cancel: {
    alignSelf: 'flex-start',
    color: 'white'
  },
  dateBooking: {
    color: '#3B4B72',
    marginTop: 5,
    marginBottom: 3
  },
  dateBooking_cancel: {
    color: 'white',
    marginTop: 5,
    marginBottom: 3
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#b7ede6',
    margin: 3
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
})

export default Order
