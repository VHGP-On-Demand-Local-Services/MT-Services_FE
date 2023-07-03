import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, Divider, Heading, HStack } from "native-base"
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import Banner from '../../Components/Banner'
import ServiceList from './ServiceList'
import SaleBanner from '../../Components/SaleBanner'
import { searchService } from '../../Redux/features/ServiceSlice';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { services, loading } = useSelector(state => state.service.searchServices);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (keyword) => {
    if (keyword != '') {
      dispatch(searchService(keyword));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >
        <HStack space={2} marginBottom={3} marginTop={5} marginLeft={5} marginRight={5}>
          <VStack w="90%">
            <Input
              placeholder="Tìm kiếm" width="100%"
              borderRadius={4} py="3" px="1" fontSize="15"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
              onChangeText={handleSearch}
            />
          </VStack>
          <VStack justifyContent='center'>
            <Pressable style={{ borderRadius: 40 }} >
              <Ionicons name='notifications-outline' size={30} />
            </Pressable>
          </VStack>
        </HStack>
        <VStack style={{ marginBottom: 20,flexDirection: 'row', flexWrap: 'wrap' }}>
          {loading ? (<ActivityIndicator size="large" color="#000" />) : services && services.length > 0 ? (
            <>
              {showResults && services.map((service) => (
                <TouchableOpacity
                  style={{
                    width: '33%',
                    height: 100,
                    marginBottom: 10,
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 5,
                  }}
                  key={service._id}
                  onPress={() => { navigation.navigate('Đặt lịch', { service: service }) }}
                >
                  <View style={{ borderRadius: 50, backgroundColor: '#e1e9f7', padding: 10 }}>
                    <MaterialIcons name={service.icon_name} color='#6fc4f2' size={46} />
                  </View>
                  <Text style={{ fontWeight: '600', fontSize: 15, paddingTop: 6, marginBottom: 10 }}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{color:"red",fontSize:15}}>Không có kết quả phù hợp.</Text>
              </View>
            </>
          )}
        </VStack>

        <Banner />

        <View style={{ padding: 20 }}>
          <Heading>Dịch vụ</Heading>
          <ServiceList />
          <Heading>Ưu đãi</Heading>
        </View>
        <SaleBanner />
      </ScrollView>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({

})

export default Home