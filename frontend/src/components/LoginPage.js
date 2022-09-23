import { Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from "react";
import axios from "axios";
import { STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";


function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [open, setOpen] = useState(false)

    let navigate = useNavigate();

    const handleLogin = async () => {
        console.log(`Login Triggered for ${username}`)
        const res = await axios.post(URL_USER_SVC + '/login',
            { username, password },
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                setOpen(true)
                if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
                    setErrorMsg(err.response.data.message)
                } else {
                    setErrorMsg('Please try again later.')
                }
            })
        // show error when login fails
        // when successful -> set up jwt tokens?
        if (res && res.status === STATUS_CODE_OK) {
            console.log(`${username} login success`)
            navigate("/home") // placeholder until merge with matching
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );


    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h4"} marginBottom={"2rem"}>Login</Typography>
            <TextField
                required
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: "1rem" }}
                autoFocus
            />
            <TextField
                required
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "1rem" }}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogin}>Login</Button>
            </Box>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                action={action}
                message={errorMsg}
            />

        </Box>
    );

}

export default LoginPage;