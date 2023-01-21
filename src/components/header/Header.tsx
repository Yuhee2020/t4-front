import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {LOGIN} from "../Routing";
import s from "./Header.module.scss"
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {logoutTC} from "../../store/reducers/authReducer";


export const Header = () => {
    const navigate = useNavigate();
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const dispatch=useAppDispatch()
    const handleLogoutClick=()=>{
        dispatch(logoutTC())
        navigate(LOGIN)
    }

    return (

        <div>
            <AppBar position="static">
                <Toolbar className={s.headerToolbar}>
                    <Typography variant="h6">
                        Task 4
                    </Typography>
                    {isLogin
                        ?<Button onClick={handleLogoutClick} color="inherit">Logout</Button>
                        :<Button onClick={() => {navigate(LOGIN)}} color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}