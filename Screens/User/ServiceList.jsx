import React from 'react'
import { View, Text } from 'react-native'
import { Stack, Center, Box } from "native-base";


const datas = [{
  id: 1,
  iconName: 'mot',
  name: 'Mot'
}, {
  id: 2,
  iconName: 'hai',
  name: 'Hai'
}, {
  id: 3,
  iconName: 'ba',
  name: 'Ba'
},
{
  id: 4,
  iconName: 'bon',
  name: 'Bon'
},
{
  id: 5,
  iconName: 'nam',
  name: 'Nam'
},
]

const ServiceList = () => {

  return (
    <View>
      <Text>ServiceList</Text>
      <View style={{ margin: 20, flexDirection: 'row', flexWrap: 'wrap', }}>
        {datas.map((data) => (
          <Box style={{
            width: '33%', height: 100,
            backgroundColor: 'red',
            marginBottom: 10,
            alignContent: 'center',
            alignItems: 'center'
            // marginRight: 2
          }} key={data.id} shadow={2}>
            <Text>{data.name}</Text>
          </Box>
        ))}


      </View>
    </View>
  )
}

export default ServiceList