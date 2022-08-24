import React, {useState} from 'react'
import {SafeAreaView, ImageBackground, ScrollView, Text, Dimensions, Image} from 'react-native'
import styles from "../Theme/common";
import StatusBarCustom from "../components/StatusBarCustom";
let { width } = Dimensions.get('window');
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
const ProfileScreen = () => {

    const [time, setTime] = useState('')
    const onChangeDate = (date) => {
        alert(date);

    }
    const renderChildDay = (day) => {
        if (_.includes(['2018-11-15', '2018-12-10', '2018-12-20'], day)) {
            return <Image source={require('../assets/images/ic_lock_green.png')} style={styles.icLockRed} />
        }
        if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2018-12-18'], day)) {
            return <Image source={require('../assets/images/ic_lock_red.png')} style={styles.icLockRed} />
        }
    }

    return (
        <SafeAreaView style={styles.flex1}>
            <StatusBarCustom />
            <ImageBackground style={styles.bgStyle} source={require('../assets/images/icon5.jpg')}>
                <ScrollView style={styles.listScroll}>
                    <Text style={[styles.headingText, styles.textHeader]}>Page Profile</Text>
                    <DateTime
                        date={time}
                        changeDate={(date) => onChangeDate(date)}
                        format='YYYY-MM-DD'
                        renderChildDay={(day) => renderChildDay(day)}
                    />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default  ProfileScreen
