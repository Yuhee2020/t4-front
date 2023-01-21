import React, {useEffect, useState} from 'react';
import s from './Login.module.scss'
import {Navigate, NavLink} from 'react-router-dom';
import {FormControl, FormLabel, IconButton, InputAdornment, Paper, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {REGISTRATION, USERS} from "../../components/Routing";
import {validate} from "../../utils/validation";
import {loginTC, setRegistered} from "../../store/reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";


export const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const dispatch=useAppDispatch()
    const isLogin=useAppSelector(state=>state.auth.isLogin)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });


    useEffect(()=>{
        dispatch(setRegistered(false))
    },[dispatch])


    if (isLogin) {
        return <Navigate to={USERS}/>
    }

    return (
        <div className={s.loginBox}>
            <Paper className={s.loginPaper}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl fullWidth>
                        <FormLabel className={s.loginFormLabel}>
                            <h2>Login</h2>
                        </FormLabel>
                            <TextField
                                label="Email"
                                helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : " "}
                                variant="standard"
                                type="text"
                                error={formik.touched.email && !!formik.errors.email}
                                {...formik.getFieldProps('email')}
                            />
                            <TextField
                                autoComplete={''}
                                label="Password"
                                helperText={formik.touched.password && !!formik.errors.password ? formik.errors.password : " "}
                                variant="standard"
                                type={showPassword ? 'text' : 'password'}
                                error={formik.touched.password && !!formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                {...formik.getFieldProps('password')}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'} fullWidth>
                                Login
                            </Button>
                        <FormLabel style={{textAlign: "center"}}>
                            <h6 style={{color: "gray"}}>If you don't have an account, please register</h6>
                            <h4><NavLink to={REGISTRATION} style={{color: 'blue'}}>Register</NavLink></h4>
                        </FormLabel>
                    </FormControl>
                </form>
            </Paper>
        </div>
    );
};



