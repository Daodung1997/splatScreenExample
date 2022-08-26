import React, {useEffect, useState, memo} from 'react'
import {SafeAreaView, View, TextInput, ImageBackground, TouchableOpacity, ScrollView} from 'react-native'
import styles from "../Theme/common";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/Feather";
import TodoItem from "../components/TodoItem";
import {deleteTodo, getList, updateTodo, deleteMessage, createTodo} from "../reducers/todos.reducer";
import  {showMessage} from "react-native-flash-message"
import StatusBarCustom from "../components/StatusBarCustom";

const TodoScreen = () => {

    const dispatch = useDispatch()
    const { listTodos, loading, message} = useSelector((state) => state.todos)
    const [todoName, setTodoName] = useState('')
    const handleAddTodo = () => {
        let todo = {
            name: todoName,
            created_at: Date.now(),
            isDone: false
        }
        dispatch(createTodo(todo))
        setTodoName('')
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
        dispatch(deleteTodo(id))
    }

    const handleCheckedTodo = (todo) => {
        dispatch(updateTodo(todo))
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
                        style={styles.textInput}
                        onChangeText={(todoName)=> setTodoName(todoName)}
                        onKeyPress={handleChangeText}
                        onSubmitEditing={() =>handleAddTodo}
                        value={todoName}
                        placeholder={'Please enter plugin name !'}
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={()=> handleAddTodo()}>
                        <Icon name="plus" size={30} color="#900" style={{marginLeft: 15}}></Icon>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.listScroll}>
                    {
                        listTodos.map((todo, index)=> (
                            <TodoItem
                                key={index}
                                text={todo.name}
                                isDone={todo.isDone}
                                handleDeleteRecord={() => handleDeleteTodo(todo.id)}
                                handleCheckedRecord = { () => handleCheckedTodo(todo)}
                            ></TodoItem>
                        ))
                    }
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>

    )
}
export default  memo(TodoScreen)
