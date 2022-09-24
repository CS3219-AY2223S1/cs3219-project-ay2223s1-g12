import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { STATUS_CODE_OK } from "../constants";
import { URL_USER_SVC } from "../configs";
import { useNavigate, useLocation } from "react-router-dom";

function Home(props) {
    let navigate = useNavigate();

    const { state } = useLocation();
    const { username } = state || 'NOT LOGGED IN USER'; // Read values passed on state

    const handleLogout = async () => {
        const res = await axios.post(URL_USER_SVC + '/logout',
            { username },
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
            })

        if (res && res.status === STATUS_CODE_OK) {
            console.log(`${username} logout success`)
            navigate("/logout") // placeholder until merge with matching
        }
    }

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"}>
            <Typography variant={"h3"}>HOME PAGE PLACEHOLDER, Welcome back {username}!</Typography>
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </Box>)
}

export default Home;