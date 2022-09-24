import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from './components/SignupPage';
import { Box } from "@mui/material";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        {/* Placeholder home for matching-service */}
                        <Route path="/home" element={<Home />} />
                        <Route path="/logout" element={<LogoutPage />} />
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
