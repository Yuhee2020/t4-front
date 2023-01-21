import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "app",
    initialState:{
        isLoading:false,
        error:null as null | string,
        successMessage:null as null | string,
    },
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading=action.payload
        },
        setAppError(state, action: PayloadAction<null | string>) {
            state.error=action.payload
        },
        setSuccessMessage(state, action: PayloadAction<null | string>){
            state.successMessage=action.payload
        }
    }
})

export const appReducer = slice.reducer
export const {setLoading, setAppError, setSuccessMessage} = slice.actions