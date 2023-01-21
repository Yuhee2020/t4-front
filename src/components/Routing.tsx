import React from "react";
import {Route, Routes} from "react-router-dom";
import {Login} from "../pages/login/Login";
import {Registration} from "../pages/registration/Registration";
import {Users} from "../pages/users/Users";


export const LOGIN = '/'
export const REGISTRATION = '/registration'
export const USERS= '/users'

export const  Routing = () => {
    return (
        <div>
            <Routes>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                <Route path={USERS} element={<Users/>}/>
            </Routes>
        </div>
    )
}
