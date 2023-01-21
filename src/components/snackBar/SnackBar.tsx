import React, {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {setAppError, setSuccessMessage} from "../../store/reducers/appReducer";
import {Snackbar, SnackbarCloseReason} from "@material-ui/core";
import MuiAlert, {AlertProps} from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function SnackBar() {

    const error = useAppSelector(state => state.app.error)
    const successMessage = useAppSelector(state => state.app.successMessage)

    const dispatch = useAppDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError(null))
        dispatch(setSuccessMessage(null))
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={successMessage !== null} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </div>

    );
}
