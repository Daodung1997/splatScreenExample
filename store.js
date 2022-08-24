import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import TodoSlice from './reducers/todos.reducer'
// import {logger} from "redux-logger/src";

const store = configureStore({
    reducer:{
        todos: TodoSlice
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store
