// import React, { useState, useEffect } from 'react'
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
// import { Select, Heading, VStack } from 'native-base'

// const OderManagement = () => {
//   const [selectedTab, setSelectedTab] = useState('waiting'); // Giá trị mặc định là 'waiting'

//   const handleTabPress = (tab) => {
//     setSelectedTab(tab);
//   };


//   return (
//     <View style={{ flex: 1 }}>
//       <View>
//         <ScrollView
//           horizontal
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//         >
//           <View style={styles.tab_container}>
//             <TouchableOpacity
//               style={[styles.button, selectedTab === 'waiting' && styles.activeButton]}
//               onPress={() => handleTabPress('waiting')}
//             >
//               <Text style={[styles.buttonText, selectedTab === 'waiting' && styles.activeButtonText]}>
//                 Chờ xác nhận
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, selectedTab === 'approved' && styles.activeButton]}
//               onPress={() => handleTabPress('approved')}
//             >
//               <Text style={[styles.buttonText, selectedTab === 'approved' && styles.activeButtonText]}>
//                 Đã xác nhận
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, selectedTab === 'cancelled' && styles.activeButton]}
//               onPress={() => handleTabPress('cancelled')}
//             >
//               <Text style={[styles.buttonText, selectedTab === 'cancelled' && styles.activeButtonText]}>
//                 Đã bị hủy
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>

//       <View style={{ flex: 0.8 }}>

//         {selectedTab === 'waiting' && (
//           <ScrollView >
//             <View style={styles.container_waiting}>
//               {/* <View style={styles.header_order}> */}
//                 <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>
//                 {/* <TouchableOpacity >
//                   <Text style={{ alignSelf: 'flex-end', color: 'red' }}>Hủy</Text>
//                 </TouchableOpacity> */}
//               {/* </View> */}
//               <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
//               <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
//               <View style={styles.header_order}>
//                 <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
//                 <View style={{ alignSelf: 'flex-end' }}>
//                   <Select>
//                     <Select.Item label='Waiting' value='waiting' />
//                     <Select.Item label='Approved' value='approved' />
//                     <Select.Item label='Cancelled' value='cancelled' />
//                   </Select>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.container_waiting}>
//               {/* <View style={styles.header_order}> */}
//                 <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>
//                 {/* <TouchableOpacity >
//                   <Text style={{ alignSelf: 'flex-end', color: 'red' }}>Hủy</Text>
//                 </TouchableOpacity> */}
//               {/* </View> */}
//               <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
//               <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
//               <View style={styles.header_order}>
//                 <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
//                 <View style={{ alignSelf: 'flex-end' }}>
//                   <Select>
//                     <Select.Item label='Waiting' value='waiting' />
//                     <Select.Item label='Approved' value='approved' />
//                     <Select.Item label='Cancelled' value='cancelled' />
//                   </Select>
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         )}

//         {selectedTab === 'approved' && (
//           <ScrollView>
//             <View style={styles.container_approve}>
//               <View style={styles.header_order}>
//                 <Heading size='lg' style={{ alignSelf: 'flex-start' }}>Máy lạnh</Heading>
//               </View>
//               <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
//               <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
//               <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
//             </View>
//           </ScrollView>
//         )}

//         {selectedTab === 'cancelled' && (
//           <ScrollView>
//             <View style={styles.container_cancelled}>
//               <View style={styles.header_order}>
//                 <Heading size='lg' style={{ alignSelf: 'flex-start', color: 'white' }}>Máy lạnh</Heading>
//               </View>
//               <Heading size='sm' style={{ color: 'white' }}>200000đ</Heading>
//               <Heading size='sm' style={{ color: 'white', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
//               <Heading size='sm' style={{ color: 'white' }}>Căn hộ: A03-23</Heading>
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container_waiting: {
//     padding: 12,
//     margin: 10,
//     backgroundColor: '#f2ecaa',
//     borderRadius: 8,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//   },
//   container_approve: {
//     padding: 12,
//     margin: 10,
//     backgroundColor: '#b6f0bc',
//     borderRadius: 8,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//   },
//   container_cancelled: {
//     padding: 12,
//     margin: 10,
//     backgroundColor: '#fa504b',
//     borderRadius: 8,
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//   },
//   header_order: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   tab_container: {
//     flexDirection: 'row',
//     margin: 10
//   },
//   button: {
//     paddingHorizontal: 22,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#b7ede6',
//     margin: 3
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   activeButton: {
//     backgroundColor: '#0aad99',
//   },
//   activeButtonText: {
//     color: 'white',
//   },
// })

// export default OderManagement

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Select, Heading } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBooking } from '../../Redux/features/BookingSlice'

const OderManagement = () => {
  const [selectedTab, setSelectedTab] = useState('waiting'); // Giá trị mặc định là 'waiting'
  const [statusSelect, setStatusSelect] = useState('waiting')

  const dispatch = useDispatch()
  const { booking, error, loading } = useSelector(state => state.booking)

  useEffect(() => {
    dispatch(getAllBooking())
  }, [dispatch])

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderWaitingItem = ({ item }) => {
    const date = new Date(item.dateBooking);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}, ${hours}:${minutes}`;

    return (
      <View style={styles.container_waiting} key={item.booking_item._id}>
        <Heading size='lg'>{item.booking_item[0].service.name}</Heading>
        <Heading size='sm' style={{ color: '#6fc4f2' }}>{item.totalPrice}đ</Heading>
        <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: {formattedDate}</Heading>
        <Heading size='sm' style={{ color: '#3B4B72' }}>Điện thoại: {item.user.phone}</Heading>
        <View style={styles.header_order}>
          <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: {item.user.apartment}</Heading>
          <Select style={{ alignSelf: 'flex-end', color: '#f78d14', fontWeight: '500' }} selectedValue={statusSelect} minWidth="120" onValueChange={itemValue => setStatusSelect(itemValue)}>
            <Select.Item label='Waiting' value='waiting' />
            <Select.Item label='Approved' value='approved' />
            <Select.Item label='Cancelled' value='cancelled' />
          </Select>
        </View>
      </View>
    );
  };

  const renderApprovedItem = ({ item }) => {
    return (
      <View style={styles.container_approve}>
        <Heading size='lg' >Máy lạnh</Heading>
        <Heading size='sm' style={{ color: '#6fc4f2' }}>200000đ</Heading>
        <Heading size='sm' style={{ color: '#3B4B72', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
        <Heading size='sm' style={{ color: '#3B4B72' }}>Điện thoại: </Heading>
        <View style={styles.header_order}>
          <Heading size='sm' style={{ color: '#3B4B72' }}>Căn hộ: A03-23</Heading>
          <Select style={{ alignSelf: 'flex-end', color: '#056e1c', fontWeight: '500' }} selectedValue={statusSelect} minWidth="120" onValueChange={itemValue => setStatusSelect(itemValue)}>
            <Select.Item label='Waiting' value='waiting' />
            <Select.Item label='Approved' value='approved' />
            <Select.Item label='Cancelled' value='cancelled' />
          </Select>
        </View>
      </View>
    );
  };

  const renderCancelledItem = ({ item }) => {
    return (
      <View style={styles.container_cancelled}>
        <Heading size='lg' style={{ color: 'white' }}>Máy lạnh</Heading>
        <Heading size='sm' style={{ color: '#ccc' }}>200000đ</Heading>
        <Heading size='sm' style={{ color: 'white', marginTop: 5, marginBottom: 3 }}>Lịch hẹn: 2023-06-26, 11:30</Heading>
        <Heading size='sm' style={{ color: '#3B4B72' }}>Điện thoại: </Heading>
        <View style={styles.header_order}>
          <Heading size='sm' style={{ color: 'white' }}>Căn hộ: A03-23</Heading>
          <Select style={{ alignSelf: 'flex-end', color: 'white', fontWeight: '500' }} selectedValue={statusSelect} minWidth="120" onValueChange={itemValue => setStatusSelect(itemValue)}>
            <Select.Item label='Waiting' value='waiting' />
            <Select.Item label='Approved' value='approved' />
            <Select.Item label='Cancelled' value='cancelled' />
          </Select>
        </View>
      </View>
    );
  };

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
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        {selectedTab === 'waiting' && (
          <FlatList
            data={booking} // Thay thế dữ liệu mẫu bằng dữ liệu thật
            renderItem={renderWaitingItem}
            keyExtractor={(item) => item._id}
          />
        )}

        {selectedTab === 'approved' && (
          <FlatList
            data={[1]} // Thay thế dữ liệu mẫu bằng dữ liệu thật
            renderItem={renderApprovedItem}
            keyExtractor={(item) => item.toString()}
          />
        )}

        {selectedTab === 'cancelled' && (
          <FlatList
            data={[1]} // Thay thế dữ liệu mẫu bằng dữ liệu thật
            renderItem={renderCancelledItem}
            keyExtractor={(item) => item.toString()}
          />
        )}
      </View>
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
});

export default OderManagement;
