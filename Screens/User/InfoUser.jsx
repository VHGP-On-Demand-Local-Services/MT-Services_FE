import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'

const InfoUser = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <View>
            <Text>InfoUser</Text>
            <Text>{user.phone}</Text>
            <Text>{user.name}</Text>
            <Text>{user.apartment}</Text>
        </View>
    )
}

export default InfoUser