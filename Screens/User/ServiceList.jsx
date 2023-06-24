import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Stack, Center, Box, ScrollView } from "native-base";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '../../Redux/features/ServiceSlice';
import { useNavigation } from '@react-navigation/native';


const ServiceList = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const { services, loading } = useSelector(state => state.service.services)


  useEffect(() => {
    dispatch(getAllService({ page, limit }))
  }, [dispatch, page])

  const navigateToNextPage = () => {
    setPage(page + 1);
  };

  const navigateToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={{ margin: 20, flexDirection: 'row', flexWrap: 'wrap', }}>
          {loading ? (<ActivityIndicator size="large" color="#000" />) : services && services.length > 0 ? (
            <>
              {services && services.map((service) => (
                <TouchableOpacity style={{
                  width: '33%', height: 100,
                  marginBottom: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 5,
                }} key={service._id} onPress={() => { navigation.navigate('Đặt lịch', { service: service }) }}>
                  <View style={{ borderRadius: 50, backgroundColor: '#e1e9f7', padding: 10 }}>
                    <MaterialIcons name={service.icon_name} color='#6fc4f2' size={46} />
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 15, paddingTop: 6, marginBottom: 10 }}>{service.name}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.pagination}>
                {page > 1 && (
                  <TouchableOpacity style={styles.paginationButton} onPress={navigateToPreviousPage} >
                    <AntDesign name="left" size={24} color="black" style={styles.paginationButtonIcon} />
                  </TouchableOpacity>
                )}
                {services.length === limit && (
                  <TouchableOpacity style={styles.paginationButton} onPress={navigateToNextPage} >
                    <AntDesign name='right' size={23} style={styles.paginationButtonIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <>
              <View >
                <Text>Không có dịch vụ.</Text>
                {page > 1 && (
                  <TouchableOpacity style={styles.paginationButton} onPress={navigateToPreviousPage}>
                    <AntDesign name='left' size={23} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )

          }

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 130
  },
  paginationButton: {
    backgroundColor: '#6fc4f2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paginationButtonIcon: {
    color: 'white',
    fontSize: 20,
  },
})

export default ServiceList