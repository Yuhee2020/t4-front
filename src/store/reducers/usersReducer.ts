import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {appApi, UserType} from "../../api/app-api";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {GridSelectionModel} from "@mui/x-data-grid";
import {StateType} from "./Store";
import {logoutTC} from "./authReducer";


export const getUsersTC = createAsyncThunk("users/get", async (params, {dispatch,rejectWithValue}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.getUsers()
        return res.data.reverse()
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const deleteUsersTC = createAsyncThunk("users/delete", async (params:GridSelectionModel, {dispatch,rejectWithValue, getState}) => {
    dispatch(setLoading(true))
    try {
        const state= getState() as StateType
        const userId= state.auth.user?.id
        const res = await appApi.deleteUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
        if (params.find(id=>id===userId)){
            dispatch(logoutTC())
        }
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const blockUsersTC = createAsyncThunk("users/block", async (params:GridSelectionModel, {dispatch,rejectWithValue,getState}) => {
    dispatch(setLoading(true))
    try {
        const state= getState() as StateType
        const userId= state.auth.user?.id
        const res = await appApi.blockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
        if (params.find(id=>id===userId)){
            dispatch(logoutTC())
        }
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})

export const unlockUsersTC = createAsyncThunk("users/unlock", async (params:GridSelectionModel, {dispatch,rejectWithValue}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.unlockUsers(params)
        dispatch(getUsersTC())
        dispatch(setSuccessMessage(res.data.message))
    } catch (err:any) {
        dispatch(setAppError(err.response.data.message))
        return rejectWithValue(null)
    } finally {
        dispatch(setLoading(false))
    }
})


export const slice = createSlice({
    name: "users",
    initialState: {
        users:[] as UserType[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUsersTC.fulfilled,(state, action)=>{
               state.users = action.payload
        })
    }
})

export const usersReducer = slice.reducer
