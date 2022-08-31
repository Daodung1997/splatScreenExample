import React, {useEffect, useState} from 'react'
import {SafeAreaView, View, FlatList, TouchableOpacity, Text, Image, ActivityIndicator} from 'react-native'
import styles from "../Theme/common";
import StatusBarCustom from "../components/StatusBarCustom";
import {useDispatch, useSelector} from "react-redux";
import {getList} from "../reducers/user.reducer";
import {Searchbar } from "react-native-paper";

const HomeScreen = () => {
    let dispatch = useDispatch()
    let {listUser, loading, message} = useSelector(state => state.users)
    let [q, setQ] = useState('')

    useEffect(() => {
        dispatch(getList({page: 1, seed: ''}))
    }, []);

    const onSearch = () => {
        dispatch(getList({page: 1, seed: q}))
    }

    const renderItem = ({item})=> {
        return (
            <TouchableOpacity style={styles.rowUser}>
                <Image style={styles.imageUser}  source={{uri:item.picture.thumbnail}}></Image>
                <View style={styles.rowText}>
                    <Text style={styles.rowTextHeading1}>{item.name.title} {item.name.first}</Text>
                    <Text style={styles.rowTextHeading2}>{item.email}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderHeader = () => {
        return (
            <Searchbar
                onChangeText={(q) => setQ(q)}
                onIconPress={()=> onSearch}
                value={q}
                placeholder={'Type here'} />
        )
    }
    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    return(
        <SafeAreaView style={[styles.flex1]}>
            <StatusBarCustom />
            <FlatList
                style={styles.listUser}
                data={listUser}
                renderItem={renderItem}
                keyExtractor={(item) => item.phone}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    )
}

export default HomeScreen
