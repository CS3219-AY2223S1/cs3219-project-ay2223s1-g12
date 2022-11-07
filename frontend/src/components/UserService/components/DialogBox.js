import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React from 'react';
import {Link} from "react-router-dom";

import './DialogBox.css';

const DialogBox = (props) => {
    return (
        <Dialog
            className="dialogBox"
            open={props.isDialogOpen}
            onClose={props.closeDialog}
        >   
            {props.isSignupSuccess && (
            <div className="dialogWrapperSuccess">
            <DialogTitle className="dialogTitle" style={{ fontWeight: "bold" }}>{`✅ ${props.dialogTitle}`}</DialogTitle>
            <DialogContent>
                <DialogContentText className="dialogContentText">{props.dialogMsg}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: "16px"}}>
                <Button style={{ color: "white", fontWeight: "bold", backgroundColor: "#05CE91", borderRadius: "20px"}} component={Link} to="/login">Log in</Button>
            </DialogActions>
            </div>)}
            {!props.isSignupSuccess && (
            <div className="dialogWrapperError">
            <DialogTitle className="dialogTitle" style={{ fontWeight: "bold" }}>{`🚨 ${props.dialogTitle}`}</DialogTitle>
            <DialogContent>
                <DialogContentText className="dialogContentText">{props.dialogMsg}</DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: "16px"}}>
                <Button style={{ color: "white", backgroundColor: "#FF3152", borderRadius: "20px"}} onClick={props.closeDialog}>Close</Button>
            </DialogActions>
            </div>)}
        </Dialog>
    );
}

export default DialogBox;
