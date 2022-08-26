import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
let URL_API = 'https://62e0b6e998dd9c9df615e954.mockapi.io/borrows'

export const getList = createAsyncThunk(
    'borrows/getList',
    async (thunkAPI) => {
        const res = await  axios.get(URL_API)
        return res
    }
)

export const deleteBorrowItem = createAsyncThunk(
    'borrows/deleteBorrowItem',
    async (data, { rejectWithValue }) => {
        const res = await  axios.delete(`${URL_API}/${data}`)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

export const updateBorrowItem = createAsyncThunk(
    'borrows/updateBorrowItem',
    async (data, { rejectWithValue }) => {
        let dataPayload = Object.assign({}, data)
        dataPayload.status = !dataPayload.status
        const res = await  axios.put(`${URL_API}/${data.id}`, dataPayload)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

export const createBorrowItem = createAsyncThunk(
    'borrows/createBorrowItem',
    async (data, { rejectWithValue }) => {
        let dataPayload = Object.assign({}, data)
        const res = await  axios.post(`${URL_API}`, dataPayload)
        if(res.status <200 || res.status >=300){
            return rejectWithValue(res)
        }
        return res
    }
)

const borrowItemSlice = createSlice( {
    //Note createSlice có một số thành phần chính
    // name : Name được sử dụng trong các actions type
    // initialState: chứa các state
    // reducer: Chứa các case reducers. Key name will used to generate actions
    // extraReducers: // Thành phần bổ sung có thể là "Builder callback" function used to add more reducers
    // or additional object of "case reducers"
    //
    name: 'borrows',
    initialState:{
        listBorrowItem: [],
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
            state.listBorrowItem = [].concat(payload.data)
        },
        [getList.rejected]: (state) => {
            state.loading = false
        },

        // Delete
        [deleteBorrowItem.pending]: (state) => {
            state.loading = true
        },

        [deleteBorrowItem.fulfilled] : (state, {payload}) => {
            state.loading = false
            let idPlugin  = payload.data.id
            state.listBorrowItem = state.listBorrowItem.filter( elm => {
                return elm.id !== idPlugin
            })
            state.message = 'Delete successfully'
        },
        [deleteBorrowItem.rejected]: (state) => {
            state.loading = false
        },

        // Update
        [updateBorrowItem.pending]: (state) => {
            state.loading = true
        },

        [updateBorrowItem.fulfilled] : (state, {payload}) => {
            state.loading = false
            let idPlugin  = payload.data.id
            let stateCheck = state.listBorrowItem.findIndex(elm => elm.id === idPlugin)
            if(stateCheck >=0){
                state.listBorrowItem[stateCheck].isDone = !state.listBorrowItem[stateCheck].isDone
            }
            state.message = 'Update status plugin successfully'

        },
        [updateBorrowItem.rejected]: (state) => {
            state.loading = false
        },

        // Create
        [createBorrowItem.pending]: (state) => {
            state.loading = true
        },

        [createBorrowItem.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.listBorrowItem = [...state.listBorrowItem, payload.data]
            state.message = 'Create plugin successfully'

        },
        [createBorrowItem.rejected]: (state) => {
            state.loading = false
        },
    }

})
const {actions, reducer } = borrowItemSlice
export const {deleteMessage} = actions
export default  reducer
