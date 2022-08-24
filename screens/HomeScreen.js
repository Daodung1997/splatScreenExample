import React from 'react'
import {SafeAreaView, View, Text} from 'react-native'
import styles from "../Theme/common";
import {WebView} from "react-native-webview";
import StatusBarCustom from "../components/StatusBarCustom";
const HomeScreen = () => {
    return(
        <SafeAreaView style={styles.flex1}>
            <StatusBarCustom />
            <View style={styles.pageContainer}>
                <WebView style={styles.boxWebView}
                source={{uri: 'https://www.youtube.com/'}}></WebView>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
