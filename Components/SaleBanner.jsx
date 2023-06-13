import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import Swiper from "react-native-swiper";

var { width } = Dimensions.get('window')

const SaleBanner = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        setBanner([
            require('../assets/sale1.jpg'),
            require('../assets/sale2.jpg'),
            require('../assets/sale3.jpg'),
            require('../assets/sale4.jpg'),
        ])
        return () => {
            setBanner([])
        }
    }, [])

    return (
        <ScrollView>
            <View>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={3}
                    >
                        {banner.map((item, index) => {
                            return (
                                <Image
                                    key={index}
                                    style={styles.imageBanner}
                                    resizeMode='contain'
                                    source={item}
                                />
                            );
                        })}
                    </Swiper>
                    {/* <View style={{ height: 20 }}>

                    </View> */}
                </View>
            </View >
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 0
    },
    imageBanner: {
        height: width / 2 - 20,
        width: width - 20,
        borderRadius: 10,
        marginHorizontal: 10
    }
})

export default SaleBanner;