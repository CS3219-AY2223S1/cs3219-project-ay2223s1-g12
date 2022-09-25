import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function LogoutPage(props) {
    const { state } = useLocation();
    const [logoutMessage, setLogoutMessage] = useState("You have been signed out successfully!");

    useEffect(() => {
        // call api or anything
        let success;
        if (state !== null) {
            success = state; // Read values passed on state
        } else {
            success = false; // Read values passed on state
        }

        if (!success) {
            setLogoutMessage("You must be logged in first!");
        }
    }, [state]);


    return (
        <Box style={{ margin: 'auto' }}>
            <Typography variant={"h1"}>{logoutMessage}</Typography>
        </Box>
    )
}

export default LogoutPage;