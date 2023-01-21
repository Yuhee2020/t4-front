import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appApi, AuthDataType, LoginResponseType} from "../../api/app-api";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";



export const registerTC = createAsyncThunk("auth/register", async (params: AuthDataType, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.registration(params)
        dispatch(setRegistered(true))
        dispatch(setSuccessMessage(res.data.message))
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const loginTC = createAsyncThunk("auth/login", async (params: AuthDataType, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.login(params)
        if (res.status === 200) {
            localStorage.setItem("token", res.data.token)
            dispatch(setIsLogin(true))
            return res.data
        }
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        localStorage.removeItem("token")
        dispatch(setIsLogin(false))
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const authTC = createAsyncThunk("auth/auth", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res= await appApi.auth()
        localStorage.setItem("token", res.data.token)
        dispatch(setUser(res.data))
        console.log(res.data)
    } catch (err: any) {
    } finally {
        dispatch(setLoading(false))
    }
})


export const slice = createSlice({
    name: "auth",
    initialState: {
        isRegistered: false,
        isLogin: false,
        user:null as null | LoginResponseType
    },
    reducers: {
        setRegistered(state, action: PayloadAction<boolean>) {
            state.isRegistered = action.payload
        },
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        setUser(state, action: PayloadAction<LoginResponseType>) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state,action)=>{
            if(action.payload) {
                state.user = action.payload
            }
        })
    }
})

export const authReducer = slice.reducer
export const {setRegistered, setIsLogin, setUser} = slice.actions