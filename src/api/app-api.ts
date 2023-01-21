import axios, {AxiosResponse} from "axios";
import {GridSelectionModel} from "@mui/x-data-grid";

export const instance = axios.create({
    baseURL: "https://t4-back.vercel.app",
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
})


export const appApi = {
    login(data: AuthDataType) {
        return instance.post<AuthDataType, AxiosResponse<LoginResponseType>>('/login', data)
    },
    registration(data: AuthDataType) {
        return instance.post<AuthDataType, AxiosResponse<RegistrationResponseType>>('/registration', data)
    },
    auth() {
        return instance.get('/auth',{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    },
    getUsers() {
        return instance.get<UserType[]>('/users', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    },
    deleteUsers(usersId: GridSelectionModel) {
        return instance.put('/delete', {usersId})
    },
    blockUsers(usersId: GridSelectionModel) {
        return instance.put('/block', {usersId})
    },
    unlockUsers(usersId: GridSelectionModel) {
        return instance.put('/unlock', {usersId})
    }
}

export type AuthDataType = {
    email: string
    password: string
}

export type LoginResponseType = {
    token: string;
    email: string;
    id: string;
    isBlocked: string;
}

export type RegistrationResponseType = {
    message: string;
    user?: {
        email: string;
        password: string;
        isBlocked: string;
        registrationDate: string;
        lastLoginDate: string;
        _id: string;
        __v: number;
    };
}


export type UserType = {
    _id: string;
    email: string;
    password: string;
    isBlocked: string;
    registrationDate: string;
    lastLoginDate: string;
    __v: number;
}