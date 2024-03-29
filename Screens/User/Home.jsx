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
  const [keyword, setKeyword] = useState('');

  const handleSearch = (keyword) => {
    setKeyword(keyword);
    if (keyword != '') {
      dispatch(searchService(keyword));
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setKeyword('');
      setShowResults(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleClear = () => {
    setKeyword('');
    setShowResults(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >
        <HStack space={2} marginBottom={3} marginTop={5} marginLeft={5} marginRight={5} zIndex={2} >
          <VStack w="90%">
            <Input
              placeholder="Tìm kiếm" width="100%"
              borderRadius={4} py="3" px="1" fontSize="15"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
              InputRightElement={
                keyword !== '' && (
                  <Pressable onPress={handleClear}>
                    <Ionicons name='close-outline' size={30} />
                  </Pressable>
                )
              }
              onChangeText={handleSearch}
              value={keyword}
            />
            {loading ? (<ActivityIndicator size="large" color="#000" />) : services && services.length > 0 ? (
              <>
                {showResults && (
                  <View style={{ position: 'absolute', zIndex: 2, top: 55, left: 0, right: 0 }}>
                    {services.map((service) => (
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          alignContent: 'flex-start',
                          alignItems: 'flex-start',
                          backgroundColor: 'rgba(235, 245, 242, 0.9)',
                          borderRadius: 5
                        }}
                        key={service._id}
                        onPress={() => navigation.navigate('Đặt lịch', { service: service })}
                      >
                        <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                          <MaterialIcons name={service.icon_name} color='#6fc4f2' size={50} />
                          <Text style={{ fontWeight: '700', fontSize: 18, paddingTop: 10, marginBottom: 8 }}>{service.name}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            ) : (

              <>
                {showResults && (
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    backgroundColor: 'rgba(235, 245, 242, 0.9)',
                    position: 'absolute',
                    zIndex: 2, top: 55,
                    width: "100%",
                    height: 50
                  }}>
                    <Text style={{ color: "red", fontSize: 15 }}>Không có kết quả phù hợp.</Text>
                  </View>
                )}
              </>
            )}
          </VStack>
          {/* <VStack style={{ marginBottom: 20,flexDirection: 'row', flexWrap: 'wrap' }}>
          
        </VStack> */}
          <VStack justifyContent='center'>
            <Pressable style={{ borderRadius: 40 }} >
              <Ionicons name='notifications-outline' size={30} />
            </Pressable>
          </VStack>
        </HStack>


        <Banner style={{ zIndex: 1 }} />

        <View style={{ padding: 20, zIndex: 1 }}>
          <Heading>Dịch vụ</Heading>
          <ServiceList />
          <Heading>Ưu đãi</Heading>
        </View>
        <SaleBanner style={{ zIndex: 1 }} />
      </ScrollView>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({

})

export default Home