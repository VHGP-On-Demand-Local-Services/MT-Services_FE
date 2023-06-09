import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native'
import Swiper from "react-native-swiper";

var { width } = Dimensions.get('window')

const Banner = () => {
    const [banner, setBanner] = useState([])

    useEffect(() => {
        setBanner([
            require('../assets/banner1.jpg'),
            require('../assets/banner2.jpg'),
            require('../assets/banner3.jpg'),
            require('../assets/banner4.jpg'),
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
                        style={{ height: width / 3 }}
                        showButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
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
        height: width / 3,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;