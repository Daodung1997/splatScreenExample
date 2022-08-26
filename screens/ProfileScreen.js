import React, {useEffect, useState} from 'react'
import {SafeAreaView, ImageBackground, Text, Dimensions, Image, View} from 'react-native'
import styles from "../Theme/common";
import StatusBarCustom from "../components/StatusBarCustom";
let { width } = Dimensions.get('window');
import DateTime from 'react-native-customize-selected-date'
import _ from 'lodash'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity} from "react-native-gesture-handler";
let LIST_DAY_SAVE = 'LIST_DAY_STORAGE_SAVE'
const ProfileScreen = () => {

    const [time, setTime] = useState('')
    const [color, setColor] = useState(0)
    const [goodItem, setGoodItem] = useState([])
    const [badItem, setBadItem] = useState([])
    const onChangeDate = (date) => {
        let goodItemCurrent = [].concat(goodItem)
        let badItemCurrent = [].concat(badItem)
        if(color === 0){
            if(badItem && _.includes(badItem, date)){
                setBadItem(badItem.filter(elm => elm !== date))
                badItemCurrent = badItem.filter(elm => elm !== date)
            }
            if(goodItem && !_.includes(goodItemCurrent, date)){
                setGoodItem([...goodItemCurrent, date])
                goodItemCurrent.push(date)
            }else{
                setGoodItem(goodItemCurrent.filter(elm => elm !== date))
                goodItemCurrent = goodItem.filter(elm => elm !== date)
            }

        }else{
            if(goodItem && _.includes(goodItemCurrent, date)){
                setGoodItem(goodItemCurrent.filter(elm => elm !== date))
                goodItemCurrent = goodItem.filter(elm => elm !== date)
            }
            if(badItem && !_.includes(badItemCurrent, date)){
                setBadItem([...badItemCurrent, date])
                badItemCurrent.push(date)
            }else{
                setBadItem(badItemCurrent.filter(elm => elm !== date))
                badItemCurrent = badItem.filter(elm => elm !== date)
            }
        }

        let obj = {
            goodList: goodItemCurrent,
            badList: badItemCurrent
        }
        AsyncStorage.setItem(LIST_DAY_SAVE, JSON.stringify(obj))

    }
    const renderChildDay = (day) => {
        if (_.includes(goodItem, day)) {
            return <View style={styles.bgDateGood}></View>
        }
        if (_.includes(badItem, day)) {
            return <View style={styles.bgDateBad}></View>
        }
    }

    useEffect(() => {
        AsyncStorage.getItem(LIST_DAY_SAVE).then( data => {
            if(data){
                let dataConvert = JSON.parse(data)
                setGoodItem([].concat(dataConvert.goodList))
                setBadItem([].concat(dataConvert.badList))
            }else{
                setGoodItem([])
                setBadItem([])
            }
        })
    }, [])

    return (
        <SafeAreaView style={styles.flex1}>
            <StatusBarCustom />
            <ImageBackground style={styles.bgStyle} source={require('../assets/images/icon5.jpg')}>
                <View style={styles.listScroll}>
                    <Text style={[styles.headingText, styles.textHeader]}>Page Note Calendar</Text>
                    <View style={styles.rowFlex}>
                        <TouchableOpacity style={[styles.btnBox, styles.btnGreen]} onPress={()=> setColor(0)}>
                            {color === 0 &&  <MaterialCommunityIcons name={'star'} size={20} color={'white'}></MaterialCommunityIcons>}
                            <Text style={styles.btnText}>Good</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnBox,styles.btnRed]} onPress={()=> setColor(1)}>
                            {color !==0 &&  <MaterialCommunityIcons name={'star'} size={20} color={'white'}></MaterialCommunityIcons>}
                            <Text style={styles.btnText}>Bad</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTime
                        date={time}
                        changeDate={(date) => onChangeDate(date)}
                        format='YYYY-MM-DD'
                        renderChildDay={(day) => renderChildDay(day)}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default  ProfileScreen
