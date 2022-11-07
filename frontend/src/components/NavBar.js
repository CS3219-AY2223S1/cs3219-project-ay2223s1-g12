import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { STATUS_CODE_FORBIDDEN, STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { URL_USER_SVC } from "../configs";
import DeleteAccountAlert from "./DeleteAccountAlert";
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';

import './NavBar.css';

import logo from '../assets/peerPrepLogo.png';

function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [username, setUsername] = useState(Cookies.get('username'));

    const handleOpenUserSettings = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseUserSettings = (e) => {
        setAnchorEl(null)
    }

    let navigate = useNavigate();

    const handleLogout = async () => {
        const res = await axios.post(URL_USER_SVC + '/logout',
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
            console.log(`${username} logout success`)
            navigate("/logout", { state: { success: true } }) // placeholder until merge with matching
        }
    }

    const handleHome = (e) => {
        navigate("/home");
    }

    const handleFindMatch = (e) => {
        navigate("/selectquestiondifficulty");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="peerPrepNavbar" position="sticky" style={{ backgroundColor: "#3370FF" }}>
                <Toolbar>
                    <img className="peerPrepLogo" src={logo} alt="Logo" />
                    <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} style={{ fontWeight: "bold" }}>
                        
                        <p className="logo" onClick={handleHome}>PeerPrep</p>
                     
                    </Typography>
               
                    <Box sx={{ flexGrow: 0 }}>
                        <Button className="navbarOption" color="inherit" onClick={handleHome} style={{ borderRadius: "20px", margin: "4px"}}>Home</Button>
                        <Button className="navbarOption" color="inherit" onClick={handleFindMatch} style={{ borderRadius: "20px", margin: "4px"}}>Find match</Button>
                        <Button className="navbarOption" color="inherit" onClick={handleOpenUserSettings} style={{ borderRadius: "20px", margin: "4px"}}>Settings</Button>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleCloseUserSettings}
                        >
                            <MenuItem onClick={handleCloseUserSettings}>
                                <Button style={{ textAlign: "center" }}>
                                    <Link to="/changePassword" style={{ textDecoration: "none", color:"#3370FF"}}>Change Password</Link>
                                </Button>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserSettings}>
                                <DeleteAccountAlert />
                            </MenuItem>

                        </Menu>
                            <Button className="logoutButton" color="inherit" onClick={handleLogout} style={{ borderRadius: "20px", outline: "1px solid white", margin: "4px" }}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default NavBar;