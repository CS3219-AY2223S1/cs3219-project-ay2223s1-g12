import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "axios";
import { STATUS_CODE_FORBIDDEN, STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import './DeleteAccount.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteAccount = async () => {
        const res = await axios.post(URL_USER_SVC + '/deleteAccount',
            { username },
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                // Either cookie or token expired
                if (err.response.status === STATUS_CODE_UNAUTHORIZED ||
                    err.response.status === STATUS_CODE_FORBIDDEN) {
                    navigate("/login");
                }
            })

        if (res && res.status === STATUS_CODE_OK) {
            handleClose();
            console.log(`${username} delete success`)
            navigate("/deleteAccount", { state: { success: true } }) // placeholder until merge with matching
        }
    }

    return (
        <React.Fragment>
            <Button variant="text" onClick={handleClickOpen} style={{ color: "#3370FF" }}>
                Delete Account
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{ fontWeight: "bold" }}>{"Delete Account?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ padding: "16px"}}>
                    <Button onClick={handleClose} style={{ borderRadius: "20px", backgroundColor: "#3370FF", color: "white", width: "90px"}}>Disagree</Button>
                    <Button onClick={handleDeleteAccount} style={{ borderRadius: "20px", backgroundColor: "#FF3152", color:"white", width: "90px" }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
