import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import styles from '../Theme/common'
import {formatNumberJapan} from '../utils/index'
const BillItem = (props) => (
    <View style={styles.taskWrapper}>
        <TouchableOpacity onPress={() => props.handleCheckedRecord()}>
            <Icon
                name={props.status ? "star" : "alert-octagon"}
                size={30}
                color={props.status ? 'green' : 'red'}
                style={{ marginLeft: 15 }}
            />
        </TouchableOpacity>
        <View style={[styles.task ]}>
            <Text style={[styles.billItem,styles.billName]}>
                {props.text}
            </Text>
            <Text style={[styles.billItem, styles.billPrice]}>
                {formatNumberJapan(Number(props.priceNumber),0)}đ
            </Text>
        </View>
        <Icon
            name="x"
            size={30}
            color="#900"
            style={{ marginLeft: 'auto' }}
            onPress={()=>props.handleDeleteRecord()}
        />
    </View>
)

export default BillItem
