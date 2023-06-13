import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Stack, Center, Box, ScrollView } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllService } from '../../Redux/features/ServiceSlice';


const ServiceList = () => {
  const dispatch = useDispatch()
  const { services } = useSelector(state => state.service.services)

  useEffect(() => {
    dispatch(getAllService({ page: 1, limit: 6 }))
  }, [])

  return (
    <View>
      {/* <Text>ServiceList</Text> */}
      <ScrollView horizontal>
        <View style={{ margin: 20, flexDirection: 'row', flexWrap: 'wrap', }}>
          {services && services.map((service) => (
            <Box style={{
              width: '33%', height: 100,
              marginBottom: 10,
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }} key={service._id} >
              <View style={{ borderRadius: 50, backgroundColor: '#e1e9f7', padding: 10 }}>
                <MaterialIcons name={service.icon_name} color='#6fc4f2' size={46} />
              </View>
              <Text style={{ fontWeight: '600', fontSize: 15, paddingTop: 6, marginBottom: 10 }}>{service.name}</Text>
            </Box>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default ServiceList