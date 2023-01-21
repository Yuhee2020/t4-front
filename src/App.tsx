import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {Routing} from "./components/Routing";
import {SnackBar} from "./components/snackBar/SnackBar";
import BackDrop from "./components/backDrop/BackDrop";
import {useAppDispatch} from "./store/reducers/Store";
import {authTC, setIsLogin} from "./store/reducers/authReducer";


function App() {
    const dispatch=useAppDispatch()

    useEffect(()=>{
        dispatch(authTC())
        if(localStorage.getItem('token')) {
            dispatch(setIsLogin(true))
        }
    })

    return (
        <div>
            <BackDrop/>
            <SnackBar/>
            <Header/>
            <Routing/>
        </div>
    );
}

export default App;
