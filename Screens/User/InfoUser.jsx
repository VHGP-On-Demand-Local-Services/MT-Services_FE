// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { useSelector } from 'react-redux'
// import { Feather, AntDesign, MaterialIcons } from 'react-native-vector-icons'

// const InfoUser = () => {

//     const { user } = useSelector(state => state.auth)

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Thông tin cá nhân</Text>
//             <View style={styles.infoContainer}>
//                 <Feather name="phone" size={20} />
//                 <View>
//                     <Text style={styles.infoLabel}>Phone</Text>
//                     <Text style={styles.infoText}>{user.phone}</Text>
//                 </View>
//             </View>
//             <View style={styles.infoContainer}>
//                 <AntDesign name="user" size={20} />
//                 <View style={{}}>
//                     <Text style={styles.infoLabel}>Name</Text>
//                     <Text style={styles.infoText}>{user.name}</Text>
//                 </View>
//             </View>
//             <View style={styles.infoContainer}>
//                 <MaterialIcons name="apartment" size={20} />
//                 <View>
//                     <Text style={styles.infoLabel}>Apartment</Text>
//                     <Text style={styles.infoText}>{user.apartment}</Text>
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         margin: 8,
//         alignItems: 'center',
//     },
//     title: {
//         textAlign: 'center',
//         fontSize: 25,
//         fontWeight: '600',
//         color: 'black', // Màu chữ tùy chọn
//         marginTop: 16, // Khoảng cách từ container chính
//         marginBottom: 20
//     },
//     infoContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         width: '100%',
//         paddingHorizontal: 50,
//         paddingVertical: 8,
//         marginBottom: 8,
//         borderRadius: 4,
//         elevation: 2,
//     },
//     infoLabel: {
//         color: '#ccc',
//         fontSize: 15
//     },
//     infoText: {
//         fontSize: 18
//     }
// })

// export default InfoUser

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Feather, AntDesign, MaterialIcons } from 'react-native-vector-icons'

const InfoUser = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <View style={styles.infoContainer}>
                <Feather name="phone" size={20} />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoText}>{user.phone}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <AntDesign name="user" size={20} />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Name</Text>
                    <Text style={styles.infoText}>{user.name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <MaterialIcons name="apartment" size={20} />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Apartment</Text>
                    <Text style={styles.infoText}>{user.apartment}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '600',
        color: 'black',
        marginTop: 16,
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
    },
    infoLabel: {
        color: '#777',
        fontSize: 16,
    },
    infoTextContainer: {
        alignItems: 'flex-end'
    },
    infoText: {
        fontSize: 18,
    },
})

export default InfoUser
