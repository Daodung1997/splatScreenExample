import React from 'react'
import {StatusBar} from "react-native";

const StatusBarCustom = () =>{
    return (
        <StatusBar
            backgroundColor = "#b3e6ff"
            barStyle = "dark-content"
            hidden = {false}
            translucent = {true}
        />
    )
}

export default StatusBarCustom
