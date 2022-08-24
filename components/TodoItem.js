import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import styles from '../Theme/common'
const PluginItem = (props) => (
    <View style={styles.taskWrapper}>
        <TouchableOpacity onPress={() => props.handleCheckedRecord()}>
            <Icon
                name={props.isDone ? "check" : "square"}
                size={30}
                color="#900"
                style={{ marginLeft: 15 }}
            />
        </TouchableOpacity>

        <Text style={[styles.task, props.isDone ? styles.verticalLine : '' ]}>{props.text}</Text>
        <Icon
            name="trash-2"
            size={30}
            color="#900"
            style={{ marginLeft: 'auto' }}
            onPress={()=>props.handleDeleteRecord()}
        />
    </View>
)

export default PluginItem
