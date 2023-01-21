import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {LOGIN} from "../../components/Routing";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getUsersTC} from "../../store/reducers/usersReducer";
import {DataGrid, GridColDef, GridSelectionModel} from "@mui/x-data-grid";
import s from "./Users.module.scss"
import {ToolBar} from "./toolbar/ToolBar";


export const Users = () => {
    const dispatch = useAppDispatch()

    const users = useAppSelector(state => state.users.users)
    const userIsBlocked = useAppSelector(state => state.auth.user?.isBlocked)

    const [checkedUsersId, setCheckedUsersId] = useState<GridSelectionModel>([])


    const columns: GridColDef[] = [
        {field: 'isBlocked', headerName: 'status', sortable: false, flex: 1, filterable:false},
        {field: 'id', headerName: 'Id', sortable: false, flex: 3},
        {field: 'email', headerName: 'Email', sortable: false, flex: 2},
        {field: 'name', headerName: 'Name', sortable: false, flex: 2},
        {field: 'registrationDate', headerName: 'Registration Date', sortable: false, flex: 3},
        {field: 'lastLoginDate', headerName: 'Last login Date', sortable: false, flex: 3},
    ];

    const rows = users.map((user) => {
        return {...user,
            id: user._id,
            isBlocked: user.isBlocked ? "locked" : "unlocked",
            name: user.email.split('@')[0]}
    });

    const handleUserCheck = (id: GridSelectionModel) => {
        setCheckedUsersId(id)
    }


    useEffect(() => {
        dispatch(getUsersTC())
    }, [dispatch])

    if (!localStorage.getItem('token') || userIsBlocked) {
        return <Navigate to={LOGIN}/>
    }

    return (
        <div className={s.usersContainer}>
            <ToolBar id={checkedUsersId}/>
            <DataGrid
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[10]}
                checkboxSelection
                autoHeight
                hideFooter
                onSelectionModelChange={handleUserCheck}
            />
        </div>
    );
};

