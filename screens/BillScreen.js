import React, {useEffect, useState, memo} from 'react'
import {SafeAreaView, View, TextInput, ImageBackground, TouchableOpacity, ScrollView, Text} from 'react-native'
import styles from "../Theme/common";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/Feather";
import BillItem from "../components/BillItem";
import {deleteBorrowItem, getList, updateBorrowItem, deleteMessage, createBorrowItem} from "../reducers/borrows.reducer";
import  {showMessage} from "react-native-flash-message"
import StatusBarCustom from "../components/StatusBarCustom";
import CurrencyInput from 'react-native-currency-input';

const BillScreen = () => {

    const dispatch = useDispatch()
    const { listBorrowItem, loading, message} = useSelector((state) => state.borrows)
    const [billName, setBillName] = useState('')
    const [billPrice, setBillPrice] = useState('')
    const handleAddTodo = () => {
        let todo = {
            name: billName,
            priceNumber: billPrice,
            status: false
        }
        dispatch(createBorrowItem(todo))
        setBillName('')
        setBillPrice('')
    }

    const handleShowMessage = () =>{
        if(message){
            showMessage({
                message: "Notification",
                description: message,
                type: "success",
            });
            dispatch(deleteMessage(''))
        }
    }

    const handleDeleteTodo = (id) => {
        dispatch(deleteBorrowItem(id))
    }

    const handleCheckedTodo = (todo) => {
        dispatch(updateBorrowItem(todo))
    }

    const handleChangeText = (event) => {
        if(event.nativeEvent.key === 'Enter'){
            handleAddTodo()
        }
    }

    useEffect(()=> {
        dispatch(getList())
    }, [])

    useEffect(()=>{
        handleShowMessage()
        dispatch(getList())
    }, [message])

    return (
        <SafeAreaView style={[styles.flex1]}>
            <StatusBarCustom />
            <ImageBackground
                style={styles.bgStyle}
                source={require('../assets/images/icon5.jpg')}>
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={[styles.textInputContainer, styles.padVertical10]}>
                    <TextInput
                        style={[styles.inputCommon, styles.mgHorizontal10]}
                        onChangeText={(billName)=> setBillName(billName)}
                        onKeyPress={handleChangeText}
                        onSubmitEditing={() =>handleAddTodo}
                        value={billName}
                        placeholder={'Name bill !'}
                        placeholderTextColor="gray"
                    />
                    <CurrencyInput
                        style={styles.inputCommon}
                        placeholder={'Number money'}
                        placeholderTextColor="gray"
                        value={billPrice}
                        onChangeValue={setBillPrice}
                        prefix="$"
                        delimiter=","
                        separator="."
                        precision={0}
                    />
                    <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={()=> handleAddTodo()}>
                        <Icon name="plus" size={30} color="#900" style={{marginLeft: 15}}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxNote}>
                    <View style={styles.boxNoteItem}>
                        <Icon
                            name={"star"}
                            size={30}
                            color={'green'}
                            style={{ marginLeft: 15 }}
                        />
                        <Text style={styles.boxNoteItemText}> Good</Text>
                    </View>
                    <View style={styles.boxNoteItem}>
                        <Icon
                            name={"alert-octagon"}
                            size={30}
                            color={'red'}
                            style={{ marginLeft: 15 }}
                        />
                        <Text style={styles.boxNoteItemText}> Bad Debt</Text>
                    </View>
                </View>
                <ScrollView style={styles.listScroll}>
                    {
                        listBorrowItem.map((bill, index)=> (
                            <BillItem
                                key={index}
                                text={bill.name}
                                status={bill.status}
                                priceNumber={bill.priceNumber}
                                handleDeleteRecord={() => handleDeleteTodo(bill.id)}
                                handleCheckedRecord = { () => handleCheckedTodo(bill)}
                            ></BillItem>
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    )
}
export default  memo(BillScreen)
