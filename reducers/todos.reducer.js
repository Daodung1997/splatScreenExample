import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
let URL_API = 'https://62e0b6e998dd9c9df615e954.mockapi.io/todos'

export const getList = createAsyncThunk(
    'todos/getList',
    async (thunkAPI) => {
        const res = await  axios.get(URL_API)
        return res
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deletePlugin',
    async (data, { rejectWithValue }) => {
        const res = await  axios.delete(`${URL_API}/${data}`)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updatePlugin',
    async (data, { rejectWithValue }) => {
        let dataPayload = Object.assign({}, data)
        dataPayload.isDone = !dataPayload.isDone
        const res = await  axios.put(`${URL_API}/${data.id}`, dataPayload)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

export const createTodo = createAsyncThunk(
    'todos/createPlugin',
    async (data, { rejectWithValue }) => {
        let dataPayload = Object.assign({}, data)
        const res = await  axios.post(`${URL_API}`, dataPayload)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

const pluginSlice = createSlice( {
    //Note createSlice có một số thành phần chính
    // name : Name được sử dụng trong các actions type
    // initialState: chứa các state
    // reducer: Chứa các case reducers. Key name will used to generate actions
    // extraReducers: // Thành phần bổ sung có thể là "Builder callback" function used to add more reducers
    // or additional object of "case reducers"
    //
    name: 'todos',
    initialState:{
        listTodos: [],
        loading: false,
        message: '',
    },
    reducers : {
        deleteMessage(state){
            state.message = ''
        }
    },
    extraReducers : {

        // Get
        [getList.pending]: (state)=> {
            state.loading = true
        },
        [getList.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.listTodos = [].concat(payload.data)
        },
        [getList.rejected]: (state) => {
            state.loading = false
        },

        // Delete
        [deleteTodo.pending]: (state) => {
            state.loading = true
        },

        [deleteTodo.fulfilled] : (state, {payload}) => {
            state.loading = false
            let idPlugin  = payload.data.id
            state.listTodos = state.listTodos.filter( elm => {
                return elm.id !== idPlugin
            })
            state.message = 'Delete successfully'
        },
        [deleteTodo.rejected]: (state) => {
            state.loading = false
        },

        // Update
        [updateTodo.pending]: (state) => {
            state.loading = true
        },

        [updateTodo.fulfilled] : (state, {payload}) => {
            state.loading = false
            let idPlugin  = payload.data.id
            let stateCheck = state.listTodos.findIndex(elm => elm.id === idPlugin)
            if(stateCheck >=0){
                state.listTodos[stateCheck].isDone = !state.listTodos[stateCheck].isDone
            }
            state.message = 'Update status plugin successfully'

        },
        [updateTodo.rejected]: (state) => {
            state.loading = false
        },

        // Create
        [createTodo.pending]: (state) => {
            state.loading = true
        },

        [createTodo.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.listTodos = [...state.listTodos, payload.data]
            state.message = 'Create plugin successfully'

        },
        [createTodo.rejected]: (state) => {
            state.loading = false
        },
    }

})
const {actions, reducer } = pluginSlice
export const {deleteMessage} = actions
export default  reducer
