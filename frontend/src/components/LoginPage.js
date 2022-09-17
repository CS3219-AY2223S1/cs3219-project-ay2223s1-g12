import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";


function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        console.log(`Login Triggered for ${username}`)
        // TODO: use axios library to call login backend

        // show error when login fails
        // when successful -> set up jwt tokens?
        // route to home page
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h4"} marginBottom={"2rem"}>Login</Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogin}>Login</Button>
            </Box>

        </Box>
    );

}

export default LoginPage;