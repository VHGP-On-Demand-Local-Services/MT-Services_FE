import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView, Pressable } from 'react-native'
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, Divider, Heading, HStack } from "native-base"

import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import Banner from '../../Components/Banner'
import ServiceList from './ServiceList'
import SaleBanner from '../../Components/SaleBanner'


const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >
        <HStack space={2} marginBottom={3} marginTop={5} marginLeft={5} marginRight={5}>
          <VStack w="90%">
            <Input
              placeholder="Tìm kiếm" width="100%"
              borderRadius={4} py="3" px="1" fontSize="15"
              InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}
            />
          </VStack>
          <VStack justifyContent='center'>
            <Pressable style={{ borderRadius: 40 }} >
              <Ionicons name='notifications-outline' size={30} />
            </Pressable>
          </VStack>
        </HStack>

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