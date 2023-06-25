import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Heading } from 'native-base'

const Order = () => {
  const [selectedTab, setSelectedTab] = useState('waiting'); // Giá trị mặc định là 'waiting'

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };


  return (
    <>
      {/* <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <View style={styles.tab_container}>
        <TouchableOpacity
          style={[styles.button, selectedTab === 'waiting' && styles.activeButton]}
          onPress={() => handleTabPress('waiting')}
        >
          <Text style={[styles.buttonText, selectedTab === 'waiting' && styles.activeButtonText]}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedTab === 'approved' && styles.activeButton]}
          onPress={() => handleTabPress('approved')}
        >
          <Text style={[styles.buttonText, selectedTab === 'approved' && styles.activeButtonText]}>
            Đã xác nhận
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedTab === 'cancelled' && styles.activeButton]}
          onPress={() => handleTabPress('cancelled')}
        >
          <Text style={[styles.buttonText, selectedTab === 'cancelled' && styles.activeButtonText]}>
            Đã bị hủy
          </Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}


      {selectedTab === 'waiting' && (
        <ScrollView >
          <View style={styles.container_waiting}>
            <View style={styles.header_order}>
              <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>
              <TouchableOpacity >
                <Text style={{ alignSelf: 'flex-end', color: 'red' }}>Hủy</Text>
              </TouchableOpacity>
            </View>
            <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
            <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
            <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
          </View>
          <View style={styles.container_waiting}>
            <View style={styles.header_order}>
              <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>
              <TouchableOpacity>
                <Text style={{ alignSelf: 'flex-end', color: 'red' }}>Hủy</Text>
              </TouchableOpacity>
            </View>
            <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
            <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
            <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
          </View>
        </ScrollView>
      )}

      {selectedTab === 'approved' && (
        <ScrollView>
          <View style={styles.container_approve}>
            <View style={styles.header_order}>
              <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>

            </View>
            <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
            <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
            <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
          </View>
        </ScrollView>
      )}

      {selectedTab === 'cancelled' && (
        <ScrollView>
          <View style={styles.container_cancelled}>
            <View style={styles.header_order}>
              <Heading size='lg' style={{ alignSelf: 'flex-start', color: 'white' }}>Máy lạnh</Heading>
            </View>
            <Heading size='sm' style={{ color: 'white' }}>200000đ</Heading>
            <Heading size='sm' style={{ color: 'white', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
            <Heading size='sm' style={{ color: 'white' }}>Căn hộ: A03-23</Heading>
          </View>
        </ScrollView>
      )}

    </>
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
  container_approve: {
    padding: 12,
    margin: 10,
    backgroundColor: '#b6f0bc',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  container_cancelled: {
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

