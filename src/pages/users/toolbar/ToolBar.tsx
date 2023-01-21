import React from 'react';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import s from "./ToolBar.module.scss"
import {GridSelectionModel} from "@mui/x-data-grid";
import {useAppDispatch} from "../../../store/reducers/Store";
import {blockUsersTC, deleteUsersTC, unlockUsersTC} from "../../../store/reducers/usersReducer";

type PropsType={
    id:GridSelectionModel
}

export const ToolBar = ({id}:PropsType) => {

    const dispatch=useAppDispatch()

    const handleLockClick=()=>{
        dispatch(blockUsersTC(id))
    }
    const handleUnLockClick=()=>{
        dispatch(unlockUsersTC(id))
    }
    const handleDeleteClick=()=>{
       dispatch(deleteUsersTC(id))
    }

    return (
        <div className={s.toolBarBox}>
            <IconButton aria-label="delete" onClick={handleLockClick}>
                <LockIcon fontSize={"large"} />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleUnLockClick}>
                <LockOpenIcon fontSize={"large"}/>
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDeleteClick}>
                <DeleteIcon fontSize={"large"}/>
            </IconButton>
        </div>
    );
};


