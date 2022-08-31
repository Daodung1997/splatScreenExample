import axios from "axios";
let URL_API = 'https://randomuser.me/api'
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getList = createAsyncThunk(
    'users/getList',
    async (data,{rejectWithValue}) => {
        const res = await  axios.get(`${URL_API}/?seed=${data.seed}&page=${data.page}&results=20`)
        if(res.status < 200 || res.status >= 300){
            return rejectWithValue(res)
        }
        return res
    }
)


const userSlice = createSlice( {
    //Note createSlice có một số thành phần chính
    // name : Name được sử dụng trong các actions type
    // initialState: chứa các state
    // reducer: Chứa các case reducers. Key name will used to generate actions
    // extraReducers: // Thành phần bổ sung có thể là "Builder callback" function used to add more reducers
    // or additional object of "case reducers"
    //
    name: 'users',
    initialState:{
        listUser: [],
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
            state.listUser = []
        },
        [getList.fulfilled] : (state, {payload}) => {
            state.loading = false
            state.listUser = [].concat(payload.data.results)
        },
        [getList.rejected]: (state) => {
            state.loading = false
            state.listUser = []
        },


    }

})
const {actions, reducer } = userSlice
export const {deleteMessage} = actions
export default  reducer
