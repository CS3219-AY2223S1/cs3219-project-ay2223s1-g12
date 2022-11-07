import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import SignupPage from './components/SignupPage';
import ChangePasswordPage from "./components/ChangePasswordPage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import Home from "./components/Home";
import DeleteAccountPage from "./components/DeleteAccountPage";
import SelectionView from './components/MatchingService/SelectionView';
import CountdownView from './components/MatchingService/CountdownView';
import RoomPage from './components/MatchingService/RoomPage'
import NavBar from "./components/NavBar";

import './App.css';

function WithNavBar() {
    return (
        <div className="appContainer">
            <NavBar className="peerPrepNavbar" />
            <Outlet className="contentContainer"/>
        </div>
    )

}

function App() {

    return (
        <div className="App" style={{ top: '0',
            width: '100%',
            position: 'fixed' }}>
            {/* <Box display={"flex"} flexDirection={"column"} padding={"4rem"}> */}
            <Router>
                <Routes>
                    <Route exact path="/" element={<Navigate replace to="/home" />}></Route>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/deleteAccount" element={<DeleteAccountPage />} />
                    {/* Placeholder home for matching-service */}
                    <Route path="/" element={<WithNavBar />}>
                        <Route path="home" element={<Home />} />
                        <Route path="changePassword" element={<ChangePasswordPage />} />
                        <Route path="selectquestiondifficulty" element={<SelectionView />}></Route>
                        <Route path="findingmatch" element={<CountdownView />}></Route>
                        <Route path="roompage" element={<RoomPage />}></Route>
                    </Route>
                </Routes>
            </Router>
            {/* </Box> */}
        </div>
    );
}

export default App;
