import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";
import {useAppSelector} from "../../store/reducers/Store";

const BackDrop = () => {

    const isLoading = useAppSelector((state) => state.app.isLoading)

    return (
        <Backdrop open={isLoading} sx={{color: '#fff', zIndex: 10}}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default BackDrop;